package com.example.a4ic1.projektkoncowyskrzypczak.Activities;

import android.content.DialogInterface;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;

import com.example.a4ic1.projektkoncowyskrzypczak.Helpers.Networking;
import com.example.a4ic1.projektkoncowyskrzypczak.Helpers.UploadFoto;
import com.example.a4ic1.projektkoncowyskrzypczak.R;

import java.io.File;

public class UploadActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_upload);
        if(Networking.NetworkConnection(this)){
            new UploadFoto(this).execute();
            //finish();
        }
        else{
            AlertDialog.Builder alert = new AlertDialog.Builder(UploadActivity.this);
            alert.setTitle("Blad");
            alert.setMessage("Brak polaczenia z internetem");
            alert.setCancelable(false);
            alert.setNeutralButton("OK", new DialogInterface.OnClickListener() {
                public void onClick(DialogInterface dialog, int which) {
                    finish();
                }
            });
            alert.show();
        }
        getSupportActionBar().hide();
    }
}
