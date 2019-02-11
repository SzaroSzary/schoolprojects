package com.example.a4ic1.projektkoncowyskrzypczak.Activities;

import android.content.DialogInterface;
import android.content.Intent;
import android.os.Environment;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.ListView;

import com.example.a4ic1.projektkoncowyskrzypczak.R;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

public class AlbumActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_album);
        final File mainfolder = new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES) + "/RobertSkrzypczak");
        loadFolders(mainfolder);
        ImageButton addbutton = (ImageButton) findViewById(R.id.addbutton);
        addbutton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                final AlertDialog.Builder alert = new AlertDialog.Builder(AlbumActivity.this);
                alert.setTitle("NOWY FOLDER");
                alert.setMessage("Podaj nazwę nowego folderu:");
                alert.setCancelable(false);
                final EditText input = new EditText(AlbumActivity.this);
                alert.setView(input);
                alert.setPositiveButton("DODAJ", new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {
                        File nowyfolder = new File(mainfolder.getPath() + "/" + input.getText().toString());
                        if (!nowyfolder.exists())
                            nowyfolder.mkdir();
                        dialog.dismiss();
                        activityRefresh();
                    }
                });
                alert.setNegativeButton("ANULUJ", new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {
                        dialog.dismiss();
                        activityRefresh();
                    }
                });
                alert.show();
            }
        });
        getSupportActionBar().hide();
    }
    public void onRestart() {
        super.onRestart();
        activityRefresh();
    }
    void activityRefresh(){
        final File mainfolder = new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES) + "/RobertSkrzypczak");
        loadFolders(mainfolder);
    }
    void loadFolders(File mainfolder){
        File[] files = mainfolder.listFiles();
        final List<String> array = new ArrayList<String>();
        for (int i = 0; i < files.length; i++) {
            File temp = new File(String.valueOf(files[i]));
            if(temp.isDirectory()){
                String tempname = temp.getName();
                array.add(tempname);
            }
        }
        array.toArray(new String[array.size()]);
        ArrayAdapter<String> adapter = new ArrayAdapter<String>(
                AlbumActivity.this,
                R.layout.design_row,
                R.id.tv1,
                array);
        final ListView listView = (ListView) findViewById(R.id.listview);
        listView.setAdapter(adapter);
        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                Intent intent = new Intent(AlbumActivity.this, AlbumFolderActivity.class);
                intent.putExtra("albumtext", array.get(i));
                startActivity(intent);
            }
        });
    }
}
