package com.example.a4ic1.projektkoncowyskrzypczak.Helpers;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.view.View;

/**
 * Created by 4ic1 on 2017-10-27.
 */
public class Kolo extends View {
    private Canvas canvas;
    private int x, y, r;
    public Kolo(Context context, int x,int y,int r) {
        super(context);
        canvas = new Canvas();
        this.x = x;
        this.y = y;
        this.r = r;
        draw(canvas);
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        Paint paint = new Paint(Paint.ANTI_ALIAS_FLAG);
        paint.setAntiAlias(true);
        paint.setStyle(Paint.Style.STROKE);
        paint.setStrokeWidth(1);
        paint.setColor(Color.argb(150, 255, 255, 255));
        canvas.drawCircle(x, y, r, paint);
    }
}
