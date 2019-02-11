package com.example.a4ic1.projektkoncowyskrzypczak.Activities;

import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Typeface;
import android.net.Uri;
import android.os.Environment;
import android.support.v7.app.ActionBar;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.RelativeLayout;

import com.example.a4ic1.projektkoncowyskrzypczak.Adapters.SwipeAdapter;
import com.example.a4ic1.projektkoncowyskrzypczak.Helpers.DatabaseManager;
import com.example.a4ic1.projektkoncowyskrzypczak.Helpers.PreviewText;
import com.example.a4ic1.projektkoncowyskrzypczak.Helpers.Settings;
import com.example.a4ic1.projektkoncowyskrzypczak.R;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;

public class AlbumFolderPhotoActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_album_folder_photo);
        String[] opts = {"czcionki","upload","share","opcja 4"};
        SwipeAdapter adapter = new SwipeAdapter(
                AlbumFolderPhotoActivity.this,
                R.layout.design_row,
                R.id.tv1,
                opts);
        final ListView listView = (ListView) findViewById(R.id.swipelistview);
        listView.setAdapter(adapter);
        Bundle bundle = getIntent().getExtras();
        final String path = bundle.getString("path").toString();
        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                switch (i){
                    case 0:
                        Intent intent = new Intent(AlbumFolderPhotoActivity.this,LettersActivity.class);
                        startActivityForResult(intent, 100);
                        break;
                    case 1:
                        intent = new Intent(AlbumFolderPhotoActivity.this, UploadActivity.class);
                        startActivity(intent);
                        break;
                    case 2:
                        Intent share = new Intent(Intent.ACTION_SEND);
                        share.setType("image/jpeg");
                        String sdCard = Environment.getExternalStorageDirectory().getPath();
                        try {
                            BitmapFactory.Options bmOptions = new BitmapFactory.Options();
                            Bitmap bitmap = BitmapFactory.decodeFile(path,bmOptions);
                            String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
                            FileOutputStream out = new FileOutputStream(sdCard+"/"+timeStamp+".jpg");
                            bitmap.compress(Bitmap.CompressFormat.JPEG, 90, out);
                            //out.flush();
                            out.close();

                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                        share.putExtra(Intent.EXTRA_STREAM, Uri.parse("file:///sdcard/banan.jpg")); //pobierz plik i podziel się nim:
                        startActivity(Intent.createChooser(share, "Podziel się plikiem!")); //pokazanie okna share
                        break;
                    case 3:
                        break;
                }
            }
        });
        File myimage = new File(path);
        Bitmap myBitmap = BitmapFactory.decodeFile(myimage.getAbsolutePath());
        ByteArrayOutputStream stream = new ByteArrayOutputStream();
        myBitmap.compress(Bitmap.CompressFormat.PNG, 100, stream);
        byte[] byteArray = stream.toByteArray();
        Settings.photo = byteArray;
        ImageView imageView = (ImageView) findViewById(R.id.imagelook);
        imageView.setImageBitmap(myBitmap);
        imageView.setScaleType(ImageView.ScaleType.CENTER_CROP);
        ImageButton removebutton = (ImageButton) findViewById(R.id.removebutton);
        removebutton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                final AlertDialog.Builder alert = new AlertDialog.Builder(AlbumFolderPhotoActivity.this);
                alert.setTitle("USUWANIE");
                alert.setMessage("Czy usunąć zdjęcie?");
                alert.setCancelable(false);
                alert.setPositiveButton("TAK", new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {
                        File usunzdjecie = new File(path);
                        usunzdjecie.delete();
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
        getSupportActionBar().hide();
    }
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        switch (requestCode){
            case 100:
                RelativeLayout photoview = (RelativeLayout) findViewById(R.id.photoview);
                Bundle extras = data.getExtras();
                String fontName = (String) extras.get("tf");
                String text = (String) extras.get("text");
                String bordercolor = (String) extras.get("bordercolor");
                String backgroundcolor = (String) extras.get("backgroundcolor");
                int borcolor = Integer.parseInt(bordercolor);
                int baccolor = Integer.parseInt(backgroundcolor);
                Log.e("rs", text+"");
                Typeface gettf = Typeface.createFromAsset(getAssets(), "fonts/"+fontName);
                PreviewText prevtext = new PreviewText(AlbumFolderPhotoActivity.this,gettf,0,100,text,baccolor, borcolor);
                prevtext.setOnTouchListener(new View.OnTouchListener() {
                    @Override
                    public boolean onTouch(View view, MotionEvent motionEvent) {
                        switch(motionEvent.getAction()){
                            case MotionEvent.ACTION_MOVE:
                                view.setX((int)motionEvent.getRawX()-100);
                                view.setY((int)motionEvent.getRawY()-100);
                                break;
                        }
                        return true;
                    }
                });
                prevtext.setLayoutParams(new ViewGroup.LayoutParams(PreviewText.rect.width()+25,PreviewText.rect.height()+30));
                photoview.addView(prevtext);
                break;
        }
    }
    void activityRefresh(){
        finish();
    }
}
