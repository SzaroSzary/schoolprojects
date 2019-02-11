package com.example.a4ic1.projektkoncowyskrzypczak.Activities;

import android.content.DialogInterface;
import android.net.Network;
import android.support.v4.view.ViewPager;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;

import com.example.a4ic1.projektkoncowyskrzypczak.Helpers.GetJSON;
import com.example.a4ic1.projektkoncowyskrzypczak.Helpers.Networking;
import com.example.a4ic1.projektkoncowyskrzypczak.Helpers.UploadFoto;
import com.example.a4ic1.projektkoncowyskrzypczak.R;

public class NetworkActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_network);
        ViewPager pager = (ViewPager) findViewById(R.id.pagerweb);
        if(Networking.NetworkConnection(this)){
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
        getSupportActionBar().hide();
    }
}
