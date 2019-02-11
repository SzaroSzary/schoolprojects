package com.example.a4ic1.projektkoncowyskrzypczak.Helpers;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.media.MediaPlayer;
import android.widget.ImageView;
import android.widget.LinearLayout;

/**
 * Created by 4ic1 on 2017-10-27.
 */
public class Miniatura extends ImageView {
    private int sizex;
    private int sizey;
    public Miniatura(Context context, Bitmap bitmap,int sizex, int sizey) {
        super(context);
        this.sizex = sizex;
        this.sizey = sizey;
        this.setImageBitmap(bitmap);
        this.setLayoutParams(new LinearLayout.LayoutParams(sizex, sizey));
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        Paint paint = new Paint(Paint.ANTI_ALIAS_FLAG);
        paint.setAntiAlias(true);
        paint.setStyle(Paint.Style.STROKE);
        paint.setStrokeWidth(1);
        paint.setColor(Color.argb(150, 255, 255, 255));
        canvas.drawRect(0,0,sizex, sizey, paint);
        //canvas.drawRect(left, top, right, bottom, paint);
    }
}
