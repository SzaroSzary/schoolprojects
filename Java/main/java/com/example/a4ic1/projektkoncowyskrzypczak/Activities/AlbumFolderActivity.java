package com.example.a4ic1.projektkoncowyskrzypczak.Activities;

import android.content.DialogInterface;
import android.graphics.Point;
import android.os.Environment;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.Display;
import android.view.View;
import android.widget.ImageButton;
import android.widget.LinearLayout;

import com.example.a4ic1.projektkoncowyskrzypczak.Helpers.CustomImageView;
import com.example.a4ic1.projektkoncowyskrzypczak.Helpers.DatabaseManager;
import com.example.a4ic1.projektkoncowyskrzypczak.R;

import java.io.File;

public class AlbumFolderActivity extends AppCompatActivity {

    private DatabaseManager db;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_album_folder);
        db = new DatabaseManager(
            AlbumFolderActivity.this,
            "NotatkiSkrzypczakRobert.db",
            null,
            6
        );
        Bundle bundle = getIntent().getExtras();
        final String wartosc = bundle.getString("albumtext").toString();
        final File album = new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES) + "/RobertSkrzypczak/" + wartosc);
        generatePhotos(album);
        ImageButton removebutton = (ImageButton) findViewById(R.id.removebutton);
        removebutton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                final AlertDialog.Builder alert = new AlertDialog.Builder(AlbumFolderActivity.this);
                alert.setTitle("USUWANIE");
                alert.setMessage("Czy usunąć folder '"+wartosc+"'?");
                alert.setCancelable(false);
                alert.setPositiveButton("TAK", new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {
                        File usunfolder = new File(album.getPath());
                        for (File file : usunfolder.listFiles()){
                            file.delete();
                        }
                        usunfolder.delete();
                        dialog.dismiss();
                        activityRefresh();
                    }
                });
                alert.setNegativeButton("NIE", new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {
                        dialog.dismiss();
                    }
                });
                alert.show();
            }
        });

        //db.insert("tak","nie","nie wiem","moze");
        getSupportActionBar().hide();
    }
    void activityRefresh(){
        finish();
    }
    public void onRestart() {
        super.onRestart();
        LinearLayout linearalbum = (LinearLayout) findViewById(R.id.linearalbum);
        linearalbum.removeAllViews();
        Bundle bundle = getIntent().getExtras();
        final String wartosc = bundle.getString("albumtext").toString();
        final File album = new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES) + "/RobertSkrzypczak/" + wartosc);
        generatePhotos(album);
    }
    void generatePhotos(File album){
        File[] files = album.listFiles();
        Display display = getWindowManager().getDefaultDisplay();
        Point size = new Point();
        display.getSize(size);
        LinearLayout layoutalbum = (LinearLayout) findViewById(R.id.linearalbum);
        LinearLayout linearLayout = linearCreate(size);
        for (int i = 0; i < files.length; i++){
            if(i%2==0){
                linearLayout = linearCreate(size);
            }
            CustomImageView imageView = (CustomImageView) new CustomImageView(AlbumFolderActivity.this, files[i], size, i, db);
            linearLayout.addView(imageView);
            if(i%2==1){
                layoutalbum.addView(linearLayout);
            }
        }
        if(files.length%2==1){
            linearLayout = linearCreate(size);
            CustomImageView imageView = (CustomImageView) new CustomImageView(AlbumFolderActivity.this, files[files.length-1], size, -1, db);
            linearLayout.addView(imageView);
            layoutalbum.addView(linearLayout);
        }
    }
    LinearLayout linearCreate(Point size){
        LinearLayout linearLayout = new LinearLayout(AlbumFolderActivity.this);
        linearLayout.setOrientation(LinearLayout.HORIZONTAL);
        linearLayout.setLayoutParams(new LinearLayout.LayoutParams(size.x, size.y/4));
        return linearLayout;
    }
    DatabaseManager getDb(){
        return db;
    }
}
