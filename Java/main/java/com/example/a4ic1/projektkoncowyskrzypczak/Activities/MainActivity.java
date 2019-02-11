package com.example.a4ic1.projektkoncowyskrzypczak.Activities;

import android.content.DialogInterface;
import android.content.Intent;
import android.os.Environment;
import android.support.v4.app.FragmentManager;
import android.support.v4.view.ViewPager;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.LinearLayout;

import com.example.a4ic1.projektkoncowyskrzypczak.Helpers.GetJSON;
import com.example.a4ic1.projektkoncowyskrzypczak.Helpers.JSONData;
import com.example.a4ic1.projektkoncowyskrzypczak.Helpers.LoadImageTask;
import com.example.a4ic1.projektkoncowyskrzypczak.Helpers.Networking;
import com.example.a4ic1.projektkoncowyskrzypczak.Adapters.CustomPagerAdapter;
import com.example.a4ic1.projektkoncowyskrzypczak.R;

import java.io.File;
import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        ViewPager pager = (ViewPager) findViewById(R.id.pager);
        if(Networking.NetworkConnection(this)) {
            pager.setAdapter(null);
            GetJSON.list.clear();
            new GetJSON(this,pager).execute();
        }
        else{
            AlertDialog.Builder alert = new AlertDialog.Builder(this);
            alert.setTitle("Blad");
            alert.setMessage("Brak polaczenia z internetem");
            alert.setCancelable(false);
            alert.setNeutralButton("OK", new DialogInterface.OnClickListener() {
                public void onClick(DialogInterface dialog, int which) {

                }
            });
            alert.show();
        }
        LinearLayout photo = (LinearLayout) findViewById(R.id.photo);
        LinearLayout album = (LinearLayout) findViewById(R.id.album);
        LinearLayout note = (LinearLayout) findViewById(R.id.note);
        LinearLayout collage = (LinearLayout) findViewById(R.id.collage);
        LinearLayout web = (LinearLayout) findViewById(R.id.web);
        ArrayList<JSONData> jsondata = new ArrayList<JSONData>();
        photo.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(MainActivity.this,PhotoActivity.class);
                startActivity(intent);
            }
        });
        album.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(MainActivity.this,AlbumActivity.class);
                startActivity(intent);
            }
        });
        note.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(MainActivity.this,NoteActivity.class);
                startActivity(intent);
            }
        });
        collage.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(MainActivity.this,CollageChooseActivity.class);
                startActivity(intent);
            }
        });
        web.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(MainActivity.this,NetworkActivity.class);
                startActivity(intent);
            }
        });
        File mainfolder = new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES)+"/RobertSkrzypczak");
        if(!mainfolder.exists())
            mainfolder.mkdir();
        File miejsca = new File(mainfolder.getPath()+"/miejsca");
        if(!miejsca.exists())
            miejsca.mkdir();
        File ludzie = new File(mainfolder.getPath()+"/ludzie");
        if(!ludzie.exists())
            ludzie.mkdir();
        File rzeczy = new File(mainfolder.getPath()+"/rzeczy");
        if(!rzeczy.exists())
            rzeczy.mkdir();
        getSupportActionBar().hide();
    }

    public void onRestart() {
        super.onRestart();
    }
}
