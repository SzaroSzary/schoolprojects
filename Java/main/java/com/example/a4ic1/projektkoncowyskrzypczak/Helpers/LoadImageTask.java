package com.example.a4ic1.projektkoncowyskrzypczak.Helpers;

import android.app.ProgressDialog;
import android.content.Context;
import android.graphics.drawable.Drawable;
import android.os.AsyncTask;
import android.support.v4.view.ViewPager;
import android.util.Log;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;

import com.example.a4ic1.projektkoncowyskrzypczak.Adapters.CustomPagerAdapter;

import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ByteArrayEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.ArrayList;

/**
 * Created by 4ic1 on 2017-12-08.
 */
public class LoadImageTask extends AsyncTask<String, Void, String> {
    private Context context;
    private ProgressDialog pDialog;
    private Drawable loadedImage;
    private CustomPagerAdapter adapter;
    private JSONData jsonData;
    public static ArrayList<Drawable> images = new ArrayList<>();
    public LoadImageTask(Context context, CustomPagerAdapter adapter, int counter, String nazwa, String data)
    {
        this.context = context;
        this.adapter = adapter;
        jsonData = new JSONData(nazwa,data);
    }
    @Override
    protected String doInBackground(String... strings) {
        loadedImage = LoadImageFromWeb(strings[0]);
        return null;
    }

    @Override
    protected void onPreExecute() {
        super.onPreExecute();
        pDialog = new ProgressDialog(context);
        pDialog.setMessage("pobieram...");
        pDialog.setCancelable(false);
        pDialog.show();
    }

    @Override
    protected void onPostExecute(String s) {
        super.onPostExecute(s);
        pDialog.dismiss();
        adapter.addImage(loadedImage,jsonData);
        adapter.notifyDataSetChanged();
    }
    public Drawable LoadImageFromWeb(String url) {
        Log.e("rs",url+"");
        InputStream inputStream = null;
        try {
            inputStream = (InputStream) new URL("https://ursusss21.000webhostapp.com/img/"+url).getContent();
        } catch (IOException e) {

        }
        return Drawable.createFromStream(inputStream, url+"");

    }
}
