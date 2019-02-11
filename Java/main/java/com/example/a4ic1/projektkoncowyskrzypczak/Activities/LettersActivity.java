package com.example.a4ic1.projektkoncowyskrzypczak.Activities;

import android.content.Intent;
import android.content.res.AssetManager;
import android.graphics.Color;
import android.graphics.Point;
import android.graphics.Typeface;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.Log;
import android.view.Display;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.example.a4ic1.projektkoncowyskrzypczak.Helpers.MyColorPicker;
import com.example.a4ic1.projektkoncowyskrzypczak.Helpers.PreviewText;
import com.example.a4ic1.projektkoncowyskrzypczak.R;

import java.io.IOException;

public class LettersActivity extends AppCompatActivity {
    private PreviewText prevtext;
    Typeface gettf;
    private String tfs = "Pacifico.ttf";
    private int bordercolor= Color.RED;
    private int backgroundcolor = Color.BLUE;
    MyColorPicker colorPicker;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_letters);
        final EditText editable = (EditText) findViewById(R.id.editletters);
        final RelativeLayout lettersview = (RelativeLayout) findViewById(R.id.lettersview);
        try {
            AssetManager assetManager = getAssets();
            final String[] lista = assetManager.list("fonts");
            for(int i=0;i<lista.length;i++) {
                Typeface tf = Typeface.createFromAsset(getAssets(), "fonts/"+lista[i]);
                final TextView textView = new TextView(this);
                textView.setTypeface (tf);
                textView.setText("BANAN");
                LinearLayout fontslist = (LinearLayout) findViewById(R.id.fontslist);
                final int finalI = i;
                textView.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        lettersview.removeAllViews();
                        gettf = Typeface.createFromAsset(getAssets(), "fonts/"+lista[finalI]);
                        tfs = lista[finalI];
                        prevtext = new PreviewText(LettersActivity.this,gettf,0,100,editable.getText().toString(),backgroundcolor,bordercolor);
                        lettersview.addView (prevtext);
                    }
                });
                fontslist.addView(textView);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        Display display = getWindowManager().getDefaultDisplay();
        final Point size = new Point();
        display.getSize(size);
        TextWatcher textWatcher = new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence charSequence, int i, int i1, int i2) {

            }

            @Override
            public void onTextChanged(CharSequence charSequence, int i, int i1, int i2) {
            }

            @Override
            public void afterTextChanged(Editable editable1) {
                lettersview.removeAllViews();
                prevtext = new PreviewText(LettersActivity.this,gettf,0,100,editable1.toString(),backgroundcolor,bordercolor);
                lettersview.addView (prevtext);
            }
        };
        ImageButton addbutton = (ImageButton) findViewById(R.id.addbutton);
        addbutton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent();
                intent.putExtra("tf", tfs+"");
                intent.putExtra("text", editable.getText().toString()+"");
                intent.putExtra("bordercolor", bordercolor+"");
                intent.putExtra("backgroundcolor", backgroundcolor+"");
                setResult(100, intent);
                finish();
            }
        });
        editable.addTextChangedListener(textWatcher);
        ImageButton changeprimary = (ImageButton) findViewById(R.id.changeprimary);
        changeprimary.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                RelativeLayout letterswindow = (RelativeLayout) findViewById(R.id.letterswindow);
                colorPicker = new MyColorPicker(LettersActivity.this, size,"backgroundcolor");
                letterswindow.addView(colorPicker);
            }
        });
        ImageButton changesecondary = (ImageButton) findViewById(R.id.changesecondary);
        changesecondary.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                RelativeLayout letterswindow = (RelativeLayout) findViewById(R.id.letterswindow);
                colorPicker = new MyColorPicker(LettersActivity.this, size,"bordercolor");
                letterswindow.addView(colorPicker);
            }
        });
        getSupportActionBar().hide();
    }
    public void changeColor(String type, int color){
        final EditText editable = (EditText) findViewById(R.id.editletters);
        final RelativeLayout lettersview = (RelativeLayout) findViewById(R.id.lettersview);
        switch (type){
            case "bordercolor":
                bordercolor = color;
                break;
            case "backgroundcolor":
                backgroundcolor = color;
                break;
        }
        lettersview.removeAllViews();
        prevtext = new PreviewText(LettersActivity.this,gettf,0,100,editable.getText().toString(),backgroundcolor,bordercolor);
        lettersview.addView (prevtext);
    }
    public void removepicker(){
        RelativeLayout letterswindow = (RelativeLayout) findViewById(R.id.letterswindow);
        letterswindow.removeView(colorPicker);
    }
}
