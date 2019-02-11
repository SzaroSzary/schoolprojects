package com.example.a4ic1.projektkoncowyskrzypczak.Adapters;

import android.content.Context;
import android.content.DialogInterface;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.support.v7.app.AlertDialog;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.example.a4ic1.projektkoncowyskrzypczak.Activities.NoteActivity;
import com.example.a4ic1.projektkoncowyskrzypczak.Helpers.DatabaseManager;
import com.example.a4ic1.projektkoncowyskrzypczak.Helpers.Note;
import com.example.a4ic1.projektkoncowyskrzypczak.R;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by 4ic1 on 2017-10-06.
 */
public class MyArrayAdapter extends ArrayAdapter
{
    private ArrayList<Note> _list;
    private Context _context;
    private int _resource;
    private DatabaseManager database;
    private int pos;
    public MyArrayAdapter(Context context, int resource, ArrayList<Note> objects, DatabaseManager db) {
        super(context, resource, objects);

        this._list = objects;
        this._context = context;
        this._resource = resource;
        this.database = db;
    }
    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        this.pos = position;
        LayoutInflater inflater = (LayoutInflater) getContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        convertView = inflater.inflate(_resource, null);
        TextView tv1 = (TextView) convertView.findViewById(R.id.notetv1);
        tv1.setText(_list.get(position).getnoteId());
        TextView tv2 = (TextView) convertView.findViewById(R.id.notetv2);
        tv2.setText(_list.get(position).getTytul());
        tv2.setTextColor(Integer.parseInt(_list.get(position).getKolor()));
        TextView tv3 = (TextView) convertView.findViewById(R.id.notetv5);
        tv3.setText(_list.get(position).getTresc());
        TextView tv4 = (TextView) convertView.findViewById(R.id.notetv4);
        tv3.setText(_list.get(position).getSciezka().replace("/storage/emulated/0/Pictures/RobertSkrzypczak",""));
        ImageView iv1 = (ImageView) convertView.findViewById(R.id.noteiv);
        /*iv1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                // klik w obrazek
            }
        });*/
        return convertView;
    }
}
