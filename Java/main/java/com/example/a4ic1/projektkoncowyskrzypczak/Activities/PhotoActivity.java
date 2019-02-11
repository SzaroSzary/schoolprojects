package com.example.a4ic1.projektkoncowyskrzypczak.Activities;

import android.animation.ObjectAnimator;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Matrix;
import android.graphics.Point;
import android.graphics.drawable.RotateDrawable;
import android.hardware.Camera;
import android.os.Environment;
import android.provider.ContactsContract;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.Display;
import android.view.MotionEvent;
import android.view.OrientationEventListener;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.FrameLayout;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.Spinner;

import com.example.a4ic1.projektkoncowyskrzypczak.Helpers.CameraPreview;
import com.example.a4ic1.projektkoncowyskrzypczak.Helpers.Kolo;
import com.example.a4ic1.projektkoncowyskrzypczak.Helpers.Miniatura;
import com.example.a4ic1.projektkoncowyskrzypczak.Helpers.Note;
import com.example.a4ic1.projektkoncowyskrzypczak.Helpers.Settings;
import com.example.a4ic1.projektkoncowyskrzypczak.R;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

public class PhotoActivity extends AppCompatActivity {
    private Camera camera;
    private int cameraId = -1;
    private CameraPreview _cameraPreview;
    private FrameLayout _frameLayout;
    private byte[] fdata;
    private ArrayList<Miniatura> photos = new ArrayList<Miniatura>();
    private ArrayList<ImageButton> icons = new ArrayList<ImageButton>();
    private ArrayList<byte[]> bigphotos = new ArrayList<byte[]>();
    private Camera.Parameters camParams;
    private FrameLayout temp;
    private OrientationEventListener orientationEventListener;
    private double oldx = 0.0;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_photo);
        initCamera();
        getSupportActionBar().hide();
        camParams = camera.getParameters();
        final ImageButton takepicture = (ImageButton) findViewById(R.id.takepicture);
        ImageButton colorselection = (ImageButton) findViewById(R.id.colorselection);
        ImageButton exposure = (ImageButton) findViewById(R.id.exposure);
        ImageButton balance = (ImageButton) findViewById(R.id.balance);
        ImageButton resolution = (ImageButton) findViewById(R.id.resolution);
        String spinnernames[] = {"[opcje]","zapisz ostatnie","zapisz wszystkie", "usuń wszystkie"};
        Spinner spinner = (Spinner) findViewById(R.id.spinner);
        ArrayAdapter<String> adapter = new ArrayAdapter<String>(
                PhotoActivity.this,
                R.layout.design_row,
                R.id.tv1,
                spinnernames);
        spinner.setAdapter(adapter);
        spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> adapterView, View view, int i, long l) {
                final FrameLayout frameLayout = (FrameLayout) findViewById(R.id.frameLayout1);
                switch (i){
                    case 1:
                        savePicture(bigphotos.get(photos.size()-1));
                        break;
                    case 2:
                        saveAll();
                        break;
                    case 3:
                        for(int j = photos.size();j>0;j--){
                            Miniatura min = photos.get(photos.size()-1);
                            photos.remove(j-1);
                            bigphotos.remove(j-1);
                            frameLayout.removeView(min);
                            Log.e("rs",bigphotos.size()+"");
                            refreshCircle();
                        }
                        break;
                }
            }

            @Override
            public void onNothingSelected(AdapterView<?> adapterView) {

            }
        });
        icons.add(takepicture);
        icons.add(colorselection);
        icons.add(exposure);
        icons.add(balance);
        icons.add(resolution);
        orientationEventListener = new OrientationEventListener(this) {
           @Override
             public void onOrientationChanged(int i) {
                if(i>225&&i<315){
                    for(int j =0;j<photos.size();j++){
                        ObjectAnimator.ofFloat(photos.get(j), View.ROTATION, 90)
                            .setDuration(100)
                            .start();
                    }
                    for(int j =0;j<icons.size();j++){
                        ObjectAnimator.ofFloat(icons.get(j), View.ROTATION, 90)
                                .setDuration(100)
                                .start();
                    }
                }
                else if(i<45||i>315)
                {
                    for(int j =0;j<photos.size();j++){
                        ObjectAnimator.ofFloat(photos.get(j), View.ROTATION, 0)
                            .setDuration(100)
                            .start();
                    }
                    for(int j =0;j<icons.size();j++){
                        ObjectAnimator.ofFloat(icons.get(j), View.ROTATION, 0)
                                .setDuration(100)
                                .start();
                    }
                }
                // i zwraca kąt 0 - 360 stopni podczas obracania ekranem w osi Z
        		// tutaj wykonaj animacje butonów i miniatur zdjęć
           }
        };
        takepicture.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                camera.takePicture(null, null, camPictureCallback);
                //savepicture.setVisibility(View.VISIBLE);
                //takepicture.setVisibility(View.INVISIBLE);
            }
        });
        /*savepicture.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                final File mainfolder = new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES) + "/RobertSkrzypczak");
                File[] files = mainfolder.listFiles();
                final List<String> array = new ArrayList<String>();
                for (int i = 0; i < files.length; i++) {
                    File temp = new File(String.valueOf(files[i]));
                    if(temp.isDirectory()){
                        String tempname = temp.getName();
                        array.add(tempname);
                    }
                }
                AlertDialog.Builder alert = new AlertDialog.Builder(PhotoActivity.this);
                alert.setTitle("Gdzie zapisać?");
                alert.setItems(array.toArray(new String[array.size()]), new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {
                        String directory = array.get(which);
                        //savePhoto(fdata,directory);
                    }
                });
                alert.show();
            }
        });*/
        colorselection.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                List<String> params = camParams.getSupportedColorEffects();
                alertCreate(params,"Efekty");
            }
        });
        exposure.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                int min = camParams.getMinExposureCompensation();
                int max = camParams.getMaxExposureCompensation();
                List<String> params = new ArrayList<String>();
                for(int i = min;i<=max;i++){
                    params.add(""+i);
                }
                alertCreate(params,"Ekspozycja");
            }
        });
        balance.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                List<String> params = camParams.getSupportedWhiteBalance();
                alertCreate(params,"Balans bieli");
            }
        });
        resolution.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                List<Camera.Size> temp = camParams.getSupportedPictureSizes();
                List<String> params = new ArrayList<String>();
                for(int i = 0;i<temp.size();i++){
                    params.add(temp.get(i).width+"x"+temp.get(i).height);
                }
                alertCreate(params,"Rozdzielczość");
            }
        });
    }
    private void savePicture(final byte[] picdata) {
        final File mainfolder = new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES) + "/RobertSkrzypczak");
        File[] files = mainfolder.listFiles();
        final List<String> array = new ArrayList<String>();
        for (int i = 0; i < files.length; i++) {
            File temp = new File(String.valueOf(files[i]));
            if(temp.isDirectory()){
                String tempname = temp.getName();
                array.add(tempname);
            }
        }
        AlertDialog.Builder alert = new AlertDialog.Builder(PhotoActivity.this);
        alert.setTitle("Gdzie zapisać?");
        alert.setItems(array.toArray(new String[array.size()]), new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int which) {
                String directory = array.get(which);
                savePhoto(picdata,directory, 1);
            }
        });
        alert.show();
    }
    private void saveAll(){
        final File mainfolder = new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES) + "/RobertSkrzypczak");
        File[] files = mainfolder.listFiles();
        final List<String> array = new ArrayList<String>();
        for (int i = 0; i < files.length; i++) {
            File temp = new File(String.valueOf(files[i]));
            if(temp.isDirectory()){
                String tempname = temp.getName();
                array.add(tempname);
            }
        }
        AlertDialog.Builder alert = new AlertDialog.Builder(PhotoActivity.this);
        alert.setTitle("Gdzie zapisać?");
        alert.setItems(array.toArray(new String[array.size()]), new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int which) {
                String directory = array.get(which);
                for(int i=0;i<bigphotos.size();i++){
                    savePhoto(bigphotos.get(i),directory, i);
                }
            }
        });
        alert.show();
    }
    void alertCreate(final List params, final String info){
        final AlertDialog.Builder alert = new AlertDialog.Builder(PhotoActivity.this);
        alert.setTitle(info);
        alert.setItems((CharSequence[]) params.toArray(new String[params.size()]), new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int which) {
                String option = (String) params.get(which);
                switch (info){
                    case "Efekty":
                        camParams.setColorEffect(option);
                        break;
                    case "Ekspozycja":
                        camParams.setExposureCompensation(Integer.parseInt(option));
                        break;
                    case "Balans bieli":
                        camParams.setWhiteBalance(option);
                        break;
                    case "Rozdzielczość":
                        String[] val = option.split("x");
                        camParams.setPictureSize(Integer.parseInt(val[0]),Integer.parseInt(val[1]));
                        break;
                }
                camera.setParameters(camParams);
            }
        });
        alert.show();
    }
    void initCamera() {
        boolean cam = getPackageManager().hasSystemFeature(PackageManager.FEATURE_CAMERA);
        if (!cam) {
            // uwaga - brak kamery
        }
        else {
            cameraId = getCameraId();
            if (cameraId < 0) {
                // brak kamery z przodu!
            }
            else {
                camera = Camera.open(cameraId);
                initPreview();
            }
        }
    }
    int getCameraId(){
        int cid = 0;
        int camerasCount = Camera.getNumberOfCameras(); // gdy więcej niż jedna kamera
        for (int i = 0; i < camerasCount; i++) {
            Camera.CameraInfo cameraInfo = new Camera.CameraInfo();
            Camera.getCameraInfo(i, cameraInfo);
            if (cameraInfo.facing == Camera.CameraInfo.CAMERA_FACING_BACK) {
                cid = i;
            }
        }
        return cid;
    }
    void initPreview(){
        _cameraPreview = new CameraPreview(PhotoActivity.this, camera);
        FrameLayout frameLayout = (FrameLayout) findViewById(R.id.frameLayout1);
        frameLayout.addView(_cameraPreview);
        Display display = getWindowManager().getDefaultDisplay();
        Point size = new Point();
        display.getSize(size);
        Kolo kolo = new Kolo(PhotoActivity.this, size.x/2, size.y/2, size.x/4);
        frameLayout.addView(kolo);
    }
    private Camera.PictureCallback camPictureCallback = new Camera.PictureCallback() {
        @Override
        public void onPictureTaken(final byte[] data, Camera camera) {
            final FrameLayout frameLayout = (FrameLayout) findViewById(R.id.frameLayout1);
            //frameLayout.removeView(temp);
            Display display = getWindowManager().getDefaultDisplay();
            final Point size = new Point();
            display.getSize(size);
            bigphotos.add(data);
            final Bitmap bitmap = BitmapFactory.decodeByteArray(data, 0, data.length);
            Matrix matrix = new Matrix();
            matrix.postRotate(90);
            Bitmap rotatedBitmap = Bitmap.createBitmap(bitmap, 0, 0, bitmap.getWidth(), bitmap.getHeight(), matrix, true);
            Bitmap smallBmp = Bitmap.createScaledBitmap(rotatedBitmap, 100, 100, false);
            Miniatura miniatura = new Miniatura(PhotoActivity.this, smallBmp,size.x/8,size.x/8);
            miniatura.setOnLongClickListener(new View.OnLongClickListener() {
                @Override
                public boolean onLongClick(final View view) {
                    AlertDialog.Builder alert = new AlertDialog.Builder(PhotoActivity.this);
                    String mini[] = {"podgląd zdjęcia", "usuń zdjęcie","zapisz bieżące zdjęcie"};
                    alert.setItems(mini,new DialogInterface.OnClickListener(){
                        @Override
                        public void onClick(DialogInterface dialogInterface, int i) {
                            switch (i) {
                                case 0:
                                    byte[] tempdata = bigphotos.get(photos.lastIndexOf(view));
                                    Bitmap tempbitmap = BitmapFactory.decodeByteArray(tempdata, 0, tempdata.length);
                                    Matrix matrix = new Matrix();
                                    matrix.postRotate(90);
                                    Bitmap temprotBitmap = Bitmap.createBitmap(tempbitmap, 0, 0, tempbitmap.getWidth(), tempbitmap.getHeight(), matrix, true);
                                    Miniatura podglad = new Miniatura(PhotoActivity.this, temprotBitmap, size.x/2, (size.y/2)-80);
                                    podglad.setX(size.x/4);
                                    podglad.setY(size.y/4);
                                    frameLayout.addView(podglad);
                                    podglad.setOnClickListener(new View.OnClickListener() {
                                        @Override
                                        public void onClick(View view) {
                                            frameLayout.removeView(view);
                                            refreshCircle();
                                        }
                                    });
                                    break;
                                case 1:
                                    int byteindex = photos.lastIndexOf(view);
                                    photos.remove(view);
                                    bigphotos.remove(byteindex);
                                    frameLayout.removeView(view);
                                    refreshCircle();
                                    break;
                                case 2:
                                    savePicture(bigphotos.get(photos.lastIndexOf(view)));
                                    refreshCircle();
                                    break;
                            }
                        }
                    });
                    alert.show();
                    return false;
                }
            });
            miniatura.setOnTouchListener(new View.OnTouchListener() {
                @Override
                public boolean onTouch(View view, MotionEvent motionEvent) {
                    switch(motionEvent.getAction()) {
                        case MotionEvent.ACTION_DOWN:
                            oldx = view.getX();
                            break;
                        case MotionEvent.ACTION_MOVE:
                            view.setX(motionEvent.getRawX()-50);
                            if(view.getX()<oldx-50 || view.getX()>oldx+50){
                                int byteindex = photos.lastIndexOf(view);
                                photos.remove(view);
                                bigphotos.remove(byteindex);
                                frameLayout.removeView(view);
                                refreshCircle();
                            }
                            break;
                        case MotionEvent.ACTION_UP:
                            view.setX((int)oldx);
                            break;
                    }
                    return false;
                }
            });
            miniatura.setX(size.x/2);
            miniatura.setY(size.y/2);
            photos.add(miniatura);
            frameLayout.addView(miniatura);
            /*for(int i =0;i<photos.size();i++){
                int px = (int) (size.x/2 + size.x/4*Math.cos(Math.toRadians((360/photos.size())*i)));
                int py = (int) (size.y/2 + size.x/4*Math.sin(Math.toRadians((360/photos.size())*i)));
                px -=50;
                py -=50;
                //photos.get(i).setX(px-50);
                //photos.get(i).setY(py-50);
                ObjectAnimator.ofFloat(photos.get(i), View.TRANSLATION_X, px)
                    .setDuration(300)
                    .start();
                ObjectAnimator.ofFloat(photos.get(i), View.TRANSLATION_Y, py)
                    .setDuration(300)
                    .start();
                //temp.addView(photos.get(i));
            }*/
            refreshCircle();
            //frameLayout.addView(temp);
            camera.startPreview();
        }
    };
    private void refreshCircle(){
        Display display = getWindowManager().getDefaultDisplay();
        final Point size = new Point();
        display.getSize(size);
        for(int i =0;i<photos.size();i++){
            int px = (int) (size.x/2 + size.x/4*Math.cos(Math.toRadians((360/photos.size())*i)));
            int py = (int) (size.y/2 + size.x/4*Math.sin(Math.toRadians((360/photos.size())*i)));
            px -=50;
            py -=50;
            //photos.get(i).setX(px-50);
            //photos.get(i).setY(py-50);
            ObjectAnimator.ofFloat(photos.get(i), View.TRANSLATION_X, px)
                    .setDuration(300)
                    .start();
            ObjectAnimator.ofFloat(photos.get(i), View.TRANSLATION_Y, py)
                    .setDuration(300)
                    .start();
            //temp.addView(photos.get(i));
        }
    }
    private void savePhoto(byte[] data, String directory, int i){
        FileOutputStream fs = null;
        File file;
        String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
        try {
            Settings.photo = data;
            final Bitmap bitmapd = BitmapFactory.decodeByteArray(data, 0, data.length);
            Matrix matrix = new Matrix();
            matrix.postRotate(90);
            Bitmap rotatedBitmapd = Bitmap.createBitmap(bitmapd, 0, 0, bitmapd.getWidth(), bitmapd.getHeight(), matrix, true);
            file = new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES)+"/RobertSkrzypczak/"+directory+"/"+timeStamp+i+".jpg");
            Settings.file = file;
            fs = new FileOutputStream(file.getPath());
            rotatedBitmapd.compress(Bitmap.CompressFormat.JPEG, 100, fs);
            fs.close();
            if (!file.exists()) {
                file.createNewFile();
            }
            fs.write(data);
        }
        catch (FileNotFoundException e) {
            Log.e("rs",""+e);
        }
        catch (IOException e) {
            e.printStackTrace();
            Log.e("rs",""+e);
        }
        finally {
            try {
                if (fs != null) {
                    fs.close();
                }
            }
            catch (IOException ioe) {
                Log.e("rs","coś się wywala w finally");
            }
            finally {
                final ImageButton takepicture = (ImageButton) findViewById(R.id.takepicture);
                takepicture.setVisibility(View.VISIBLE);
                camera.startPreview();
            }
        }
    }
    public void onPause(){
        super.onPause();
        if (camera != null) {
            camera.stopPreview();
            _cameraPreview.getHolder().removeCallback(_cameraPreview);
            camera.release();
            camera = null;
        }
        photos.clear();
        bigphotos.clear();
        orientationEventListener.disable();
    }
    public void onResume(){
        super.onResume();
        if (camera == null) {
            initCamera();
        }
        if (orientationEventListener.canDetectOrientation()) {
            // Log - listener działa
            orientationEventListener.enable();
        } else {
            // Log - listener nie działa
        }
    }
}
