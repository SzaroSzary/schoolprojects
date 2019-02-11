package com.example.a4ic1.projektkoncowyskrzypczak.Helpers;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.graphics.Point;
import android.media.Image;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.RelativeLayout;

import com.example.a4ic1.projektkoncowyskrzypczak.Activities.LettersActivity;
import com.example.a4ic1.projektkoncowyskrzypczak.R;

public class MyColorPicker extends RelativeLayout {
    private int kolor = 0;
    public MyColorPicker(final Context context, Point size, final String type) {
        super(context);
        ImageView selector = new ImageView(context);
        selector.setImageResource(R.drawable.picker);
        this.setDrawingCacheEnabled(true);
        selector.setDrawingCacheEnabled(true);
        selector.setOnTouchListener(new OnTouchListener() {
            @Override
            public boolean onTouch(View view, MotionEvent motionEvent) {
                switch (motionEvent.getAction()){
                    case MotionEvent.ACTION_MOVE:
                        Bitmap bmp = view.getDrawingCache();
                        kolor = bmp.getPixel((int)motionEvent.getX(), (int)motionEvent.getY());
                        break;
                }
                return true;
            }
        });
        selector.setLayoutParams(new RelativeLayout.LayoutParams(size.x, size.x));
        this.setLayoutParams(new RelativeLayout.LayoutParams(size.x,size.y));
        this.setBackgroundColor(Color.argb(128, 0, 0, 0));
        this.addView(selector);
        ImageButton accept = new ImageButton(context);
        accept.setBackgroundResource(R.drawable.ic_done_black_48dp);
        accept.setX(size.x-100);
        accept.setY(size.x);
        accept.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View view) {
                ((LettersActivity)context).changeColor(type,kolor);
                ((LettersActivity)context).removepicker();
            }
        });
        this.addView(accept);
        ImageButton cancel = new ImageButton(context);
        cancel.setBackgroundResource(R.drawable.ic_clear_black_48dp);
        cancel.setY(size.x);
        cancel.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View view) {
                ((LettersActivity)context).removepicker();
            }
        });
        this.addView(cancel);
    }
}