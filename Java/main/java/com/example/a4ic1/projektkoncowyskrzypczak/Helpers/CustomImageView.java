package com.example.a4ic1.projektkoncowyskrzypczak.Helpers;

import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.graphics.Point;
import android.graphics.drawable.ColorDrawable;
import android.support.v7.app.ActionBar;
import android.support.v7.app.AlertDialog;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;

import com.example.a4ic1.projektkoncowyskrzypczak.Activities.AlbumFolderActivity;
import com.example.a4ic1.projektkoncowyskrzypczak.Activities.AlbumFolderPhotoActivity;
import com.example.a4ic1.projektkoncowyskrzypczak.R;

import java.io.File;
import java.text.Normalizer;

/**
 * Created by 4ic1 on 2017-09-29.
 */
public class CustomImageView extends ImageView implements View.OnClickListener, View.OnLongClickListener{
    private Context c;
    private String path;
    private DatabaseManager database;
    private String backcolor = String.valueOf(Color.RED);
    public CustomImageView(Context context, File file, Point size, int i, DatabaseManager db) {
        super(context);
        this.c=context;
        this.database = db;
        setOnClickListener(this);
        setOnLongClickListener(this);
        if (file.isFile()){
            final String imagepath = file.getPath();
            this.path = imagepath;
            Bitmap bmp = betterImageDecode(imagepath);
            this.setImageBitmap(bmp);
            this.setScaleType(ImageView.ScaleType.CENTER_CROP);
            if (i==-1) {
                this.setLayoutParams(new LinearLayout.LayoutParams(size.x, size.y));
            }
            else if(i%4==0||i%4==3){
                this.setLayoutParams(new LinearLayout.LayoutParams(size.x/3, size.y));
            }
            else{
                this.setLayoutParams(new LinearLayout.LayoutParams((size.x/3)*2, size.y));
            }
        }
    }
    @Override
    public void onClick(View view) {
        Intent intent = new Intent(this.c,AlbumFolderPhotoActivity.class);
        intent.putExtra("path", this.path);
        this.c.startActivity(intent);
        Log.e("rs","zoom");
    }
    private Bitmap betterImageDecode(String filePath) {
        Bitmap myBitmap;
        BitmapFactory.Options options = new BitmapFactory.Options();
        options.inSampleSize = 4;
        myBitmap = BitmapFactory.decodeFile(filePath, options);
        return myBitmap;
    }

    @Override
    public boolean onLongClick(View view) {
        AlertDialog.Builder alert = new AlertDialog.Builder(this.c);
        alert.setTitle("NOTATKA");
        final View noteview = View.inflate(this.c, R.layout.notes_dialog, null);
        LinearLayout notecolor = (LinearLayout) noteview.findViewById(R.id.notecolor);
        for(int i =0;i<4;i++){
            LinearLayout color = new LinearLayout(this.c);
            switch (i){
                case 0:
                    color.setBackgroundColor(Color.RED);
                    break;
                case 1:
                    color.setBackgroundColor(Color.GREEN);
                    break;
                case 2:
                    color.setBackgroundColor(Color.BLUE);
                    break;
                case 3:
                    color.setBackgroundColor(Color.YELLOW);
                    break;
            }
            color.setOnClickListener(new OnClickListener() {
                @Override
                public void onClick(View view) {
                    int bcolor = ((ColorDrawable) view.getBackground()).getColor();
                    backcolor = String.valueOf(bcolor);
                    Log.e("rs",""+bcolor);
                }
            });
            LinearLayout.LayoutParams param = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.MATCH_PARENT);
            param.weight = 1;
            param.height = 100;
            color.setLayoutParams(param);
            notecolor.addView(color);
        }
        alert.setView(noteview);
        alert.setPositiveButton("TAK", new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int which) {
                EditText title = (EditText) noteview.findViewById(R.id.notetitle);
                String stitle = title.getText().toString();
                EditText value = (EditText) noteview.findViewById(R.id.notevalue);
                String svalue = value.getText().toString();
                database.insert(stitle,svalue,backcolor,path);
                Log.e("rs",backcolor);
            }
        });
        alert.setNegativeButton("NIE", new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int which) {
                dialog.dismiss();
            }
        });
        alert.show();
        return false;
    }
}
