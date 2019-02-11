package com.example.a4ic1.projektkoncowyskrzypczak.Helpers;

import android.app.ProgressDialog;
import android.content.Context;
import android.os.AsyncTask;
import android.util.Log;

import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ByteArrayEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;

import java.io.IOException;

public class UploadFoto extends AsyncTask<String, Void, String>
{
    private Context context;
    private ProgressDialog pDialog;
    private String result;
    public UploadFoto(Context context)
    {
        this.context = context;
    }
    @Override
    protected String doInBackground(String... strings) {

        HttpPost httpPost = new HttpPost(Settings.mojserv);
        httpPost.setEntity(new ByteArrayEntity(Settings.photo));
        DefaultHttpClient httpClient = new DefaultHttpClient();
        HttpResponse httpResponse = null;
        try {
            httpResponse = httpClient.execute(httpPost);
        }
        catch (IOException e) {

        }
        try {
            result = EntityUtils.toString(httpResponse.getEntity(), HTTP.UTF_8);
        }
        catch (IOException e) {

        }
        return null;
    }

    @Override
    protected void onPreExecute() {
        super.onPreExecute();
        pDialog = new ProgressDialog(context);
        pDialog.setMessage("wysyłam...");
        pDialog.setCancelable(false);
        pDialog.show();
    }

    @Override
    protected void onPostExecute(String s) {
        super.onPostExecute(s);
        pDialog.dismiss();
        Log.e("rs",result+"");
    }
}