package com.example.a4ic1.projektkoncowyskrzypczak.Helpers;

import android.app.ProgressDialog;
import android.content.Context;
import android.os.AsyncTask;
import android.support.v4.view.ViewPager;
import android.util.Log;
import android.view.View;

import com.example.a4ic1.projektkoncowyskrzypczak.Activities.MainActivity;
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
import java.util.ArrayList;

/**
 * Created by 4ic1 on 2017-12-08.
 */
public class GetJSON extends AsyncTask<String, Void, String> {
    private Context context;
    private ProgressDialog pDialog;
    private String result;
    private JSONArray allImagesJson;
    private String jsonString;
    private ViewPager pager;
    public static ArrayList<JSONData> list = new ArrayList<JSONData>();
    public GetJSON(Context context, ViewPager pager)
    {
        this.context = context;
        this.pager = pager;
    }
    @Override
    protected String doInBackground(String... strings) {
        HttpPost httpPost = new HttpPost(Settings.jsonserv);
        DefaultHttpClient httpClient = new DefaultHttpClient();
        HttpResponse httpResponse = null;
        try {
            httpResponse = httpClient.execute(httpPost);
            jsonString = EntityUtils.toString(httpResponse.getEntity(), HTTP.UTF_8);
        } catch (IOException e) {
            e.printStackTrace();
        }
        JSONObject jsonObj = null;
        try {
            jsonObj = new JSONObject(jsonString);
            allImagesJson = jsonObj.getJSONArray("ImagesList");
        } catch (JSONException e) {
            e.printStackTrace();
        }
        for (int i = 0; i < allImagesJson.length(); i++) {
            JSONObject object = null;
            String imageName = null;
            String imageSaveTime = null;
            //String size = null;
            try {
                object = allImagesJson.getJSONObject(i);
                imageName = object.getString("imageName");
                imageSaveTime = object.getString("size");
                //size = object.getString("size");
            } catch (JSONException e) {

            }
            list.add(new JSONData(imageName, imageSaveTime));
        }
        return jsonString;
    }

    @Override
    protected void onPreExecute() {
        super.onPreExecute();
        pDialog = new ProgressDialog(context);
        pDialog.setMessage("pobieram...");
        pDialog.setCancelable(false);
    }

    @Override
    protected void onPostExecute(String s) {
        super.onPostExecute(s);
        CustomPagerAdapter adapter = new CustomPagerAdapter(context, list.size());
        adapter.resetAdapter();
        for (int i = 0; i < GetJSON.list.size(); i++) {
            new LoadImageTask(context,adapter,i,list.get(i).getX(),list.get(i).getY()).execute(GetJSON.list.get(i).getX());
        }
        pager.setAdapter(adapter);
        adapter.notifyDataSetChanged();
    }
}
