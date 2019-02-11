package com.example.a4ic1.projektkoncowyskrzypczak.Adapters;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.a4ic1.projektkoncowyskrzypczak.R;


/**
 * Created by 4ic1 on 2017-11-17.
 */
public class SwipeAdapter extends ArrayAdapter{
    private int _resource;
    private String[] _objects;
    public SwipeAdapter(Context context, int resource, int textViewResourceId, String[] objects) {
        super(context, resource, textViewResourceId, objects);
        this._resource = resource;
        _objects = new String[objects.length];
        this._objects = objects;
    }
    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        LayoutInflater inflater = (LayoutInflater) getContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        convertView = inflater.inflate(_resource, null);
        ImageView iv = (ImageView) convertView.findViewById(R.id.imagedesign);
        if(position==0)
        {
            iv.setImageResource(R.drawable.ic_format_color_text_black_48dp);
        }
        TextView tv = (TextView) convertView.findViewById(R.id.tv1);
        tv.setText(_objects[position]);
        return convertView;
    }
}
