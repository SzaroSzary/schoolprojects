package com.example.a4ic1.projektkoncowyskrzypczak.Activities;

import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.graphics.Matrix;
import android.graphics.drawable.BitmapDrawable;
import android.media.Image;
import android.net.Uri;
import android.os.Environment;
import android.provider.MediaStore;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.FrameLayout;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;

import com.example.a4ic1.projektkoncowyskrzypczak.Helpers.ImageData;
import com.example.a4ic1.projektkoncowyskrzypczak.R;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

public class CollageActivity extends AppCompatActivity {
    private ArrayList<ImageData> list;
    private ArrayList<ImageView> images = new ArrayList<ImageView>();
    private ImageView element;
    private View selected;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_collage);
        ImageButton savecollage = (ImageButton) findViewById(R.id.savecollage);
        final FrameLayout mainlayout = (FrameLayout) findViewById(R.id.collagerel);
        list = (ArrayList<ImageData>) getIntent().getSerializableExtra("list");
        for(int i = 0;i<list.size();i++){
            element = new ImageView(this);
            images.add(element);
            element.setX(list.get(i).getX());
            element.setY(list.get(i).getY());
            element.setImageResource(R.drawable.ic_camera_black_48dp);
            element.setBackgroundColor(Color.WHITE);
            element.setLayoutParams(new LinearLayout.LayoutParams(list.get(i).getW()-1,list.get(i).getH()-1));
            element.setScaleType(ImageView.ScaleType.CENTER);
            mainlayout.addView(element);
            element.setOnLongClickListener(new View.OnLongClickListener() {
                @Override
                public boolean onLongClick(final View view) {
                    String opts[] = {"galeria","aparat"};
                    final AlertDialog.Builder alert = new AlertDialog.Builder(CollageActivity.this);
                    alert.setTitle("Skąd pobrać zdjęcie?");
                    alert.setItems(opts, new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog, int which) {
                            Intent intent;
                            selected = view;
                            switch (which){
                                case 0:
                                    intent = new Intent(Intent.ACTION_PICK);
                                    intent.setType("image/*");
                                    startActivityForResult(intent, 100);
                                    break;
                                case 1:
                                    intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
                                    if (intent.resolveActivity(getPackageManager()) != null) {
                                        startActivityForResult(intent, 200);
                                    }
                                    break;
                            }
                        }
                    });
                    alert.show();
                    return false;
                }
            });
        }
        savecollage.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Log.e("s","s");
                mainlayout.setDrawingCacheEnabled(true);
                Bitmap b = mainlayout.getDrawingCache(true);
                FileOutputStream fs = null;
                File file;
                String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
                File mainfolder = new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES)+"/RobertSkrzypczak");
                File kolaze = new File(mainfolder.getPath()+"/kolaże");
                if(!kolaze.exists())
                    kolaze.mkdir();
                try {
                    file = new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES)+"/RobertSkrzypczak/kolaże/"+timeStamp+".jpg");
                    fs = new FileOutputStream(file.getPath());
                    b.compress(Bitmap.CompressFormat.JPEG, 100, fs);
                    fs.close();
                    if (!file.exists()) {
                        file.createNewFile();
                    }
                    ByteArrayOutputStream stream = new ByteArrayOutputStream();
                    b.compress(Bitmap.CompressFormat.PNG, 100, stream);
                    byte[] byteArray = stream.toByteArray();
                    fs.write(byteArray);
                } catch (FileNotFoundException e) {

                } catch (IOException e) {

                }
                finally{
                    finish();
                }
            }
        });
        getSupportActionBar().hide();
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        Bitmap b;
        element = images.get(images.indexOf(selected));
        switch (requestCode){
            case 100:
                InputStream stream = null;
                try {
                    Uri imgData = data.getData();
                    stream = getContentResolver().openInputStream(imgData);
                }
                catch (FileNotFoundException e) {
                    e.printStackTrace();
                }
                b = BitmapFactory.decodeStream(stream);
                element.setImageBitmap(b);
                break;
            case 200:
                Bundle extras = data.getExtras();
                b = (Bitmap) extras.get("data");
                element.setImageBitmap(b);
                break;
        }
        /*Matrix matrix = new Matrix();
        matrix.postRotate(90);
        Bitmap oryginal = ((BitmapDrawable) element.getDrawable()).getBitmap();
        Bitmap rotated = Bitmap.createBitmap(oryginal, 0, 0, oryginal.getWidth(), oryginal.getHeight(), matrix, true);
        element.setImageBitmap(rotated);*/
        element.setScaleType(ImageView.ScaleType.CENTER_CROP);
    }
}
