package com.example.a4ic1.projektkoncowyskrzypczak.Helpers;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Rect;
import android.graphics.Typeface;
import android.view.View;
import android.view.ViewGroup;

/**
 * Created by 4ic1 on 2017-11-17.
 */
public class PreviewText extends View {
    private Paint paint = new Paint(Paint.ANTI_ALIAS_FLAG);
    private int x, y, backgroundcolor=0,bordercolor=0;
    private String text;
    private Canvas canvas;
    public static Rect rect;
    public PreviewText(Context context, Typeface tf, int x, int y,String text, int backgroundcolor, int bordercolor) {
        super(context);
        paint.reset();
        paint.setAntiAlias(true);
        paint.setTextSize(100);
        paint.setTypeface(tf);
        canvas = new Canvas();
        this.x = x;
        this.y = y;
        this.backgroundcolor = backgroundcolor;
        this.bordercolor = bordercolor;
        this.text = text;
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        paint.setStyle(Paint.Style.FILL);
        paint.setColor(backgroundcolor);
        canvas.drawText(text, x, y, paint);
        paint.setStyle(Paint.Style.STROKE);
        paint.setStrokeWidth(5);
        paint.setColor(bordercolor);
        canvas.drawText(text, x, y, paint);
        rect = new Rect();
        paint.getTextBounds(text, 0, text.length(), rect);
        rect.offset(0, -rect.top+25);
        canvas.drawRect(rect,paint);
    }
}
