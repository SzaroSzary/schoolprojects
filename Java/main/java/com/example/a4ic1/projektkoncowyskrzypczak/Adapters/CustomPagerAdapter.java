package com.example.a4ic1.projektkoncowyskrzypczak.Adapters;

import android.content.Context;
import android.content.Intent;
import android.graphics.drawable.Drawable;
import android.net.Uri;
import android.support.v4.view.PagerAdapter;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.example.a4ic1.projektkoncowyskrzypczak.Helpers.GetJSON;
import com.example.a4ic1.projektkoncowyskrzypczak.Helpers.JSONData;
import com.example.a4ic1.projektkoncowyskrzypczak.Helpers.LoadImageTask;
import com.example.a4ic1.projektkoncowyskrzypczak.R;

public class CustomPagerAdapter extends PagerAdapter {

    Context mContext;
    LayoutInflater mLayoutInflater;
    private int size;
    Drawable[] mResources;
    public static int licznik = 0;
    private String[] data, nazwa;
    public CustomPagerAdapter(Context context, int size) {
        this.size = size;
        mContext = context;
        mLayoutInflater = (LayoutInflater) mContext.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        mResources = new Drawable[size];
        data = new String[size];
        nazwa = new String[size];
    }

    @Override
    public int getCount() {
        return mResources.length;
    }

    @Override
    public boolean isViewFromObject(View view, Object object) {
        return view == ((RelativeLayout) object);
    }

    @Override
    public Object instantiateItem(ViewGroup container, final int position) {
        RelativeLayout itemView = (RelativeLayout) mLayoutInflater.inflate(R.layout.pagerlayout, container, false);
        ImageView imageView = (ImageView) itemView.findViewById(R.id.pagerimg);
        imageView.setImageDrawable(mResources[position]);
        TextView textView = (TextView) itemView.findViewById(R.id.pagertext);
        textView.setText("Nazwa: "+this.data[position] + " \nRozmiar: "+this.nazwa[position]+" MB");
        container.addView(itemView);
        final String x = this.data[position];
        imageView.setOnLongClickListener(new View.OnLongClickListener() {
            @Override
            public boolean onLongClick(View view) {

                Intent intent = new Intent(Intent.ACTION_VIEW,Uri.parse("https://ursusss21.000webhostapp.com/img/"+x));
                mContext.startActivity(intent);
                return false;
            }
        });
        return itemView;
    }

    @Override
    public void destroyItem(ViewGroup container, int position, Object object) {
        container.removeView((RelativeLayout) object);
    }
    public void addImage(Drawable img, JSONData data){
        mResources[licznik]=img;
        this.data[licznik] = data.getX();
        this.nazwa[licznik] = data.getY();
        Log.e("rs",mResources.length+"");
        licznik++;
    }
    public void resetAdapter(){
        licznik = 0;
    }

    @Override
    public int getItemPosition(Object object) {
        return POSITION_NONE;
    }
}