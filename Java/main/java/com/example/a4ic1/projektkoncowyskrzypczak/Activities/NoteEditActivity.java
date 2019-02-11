package com.example.a4ic1.projektkoncowyskrzypczak.Activities;

import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.media.Image;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.LinearLayout;

import com.example.a4ic1.projektkoncowyskrzypczak.Helpers.DatabaseManager;
import com.example.a4ic1.projektkoncowyskrzypczak.R;

public class NoteEditActivity extends AppCompatActivity {
    private DatabaseManager database;
    private String backcolor = String.valueOf(Color.RED);
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_note_edit);
        Bundle bundle = getIntent().getExtras();
        final String id = bundle.getString("id").toString();
        final String title = bundle.getString("title").toString();
        final String content = bundle.getString("content").toString();
        this.database = new DatabaseManager(
                NoteEditActivity.this,
                "NotatkiSkrzypczakRobert.db",
                null,
                6
        );
        LinearLayout notecolor = (LinearLayout) findViewById(R.id.setcolor);
        for(int i =0;i<4;i++){
            LinearLayout color = new LinearLayout(NoteEditActivity.this);
            switch (i){
                case 0:
                    color.setBackgroundColor(Color.RED);
                    break;
                case 1:
                    color.setBackgroundColor(Color.GREEN);
                    break;
                case 2:
                    color.setBackgroundColor(Color.BLUE);
                    break;
                case 3:
                    color.setBackgroundColor(Color.YELLOW);
                    break;
            }
            color.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    int bcolor = ((ColorDrawable) view.getBackground()).getColor();
                    backcolor = String.valueOf(bcolor);
                }
            });
            LinearLayout.LayoutParams param = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.MATCH_PARENT);
            param.weight = 1;
            param.height = 100;
            color.setLayoutParams(param);
            notecolor.addView(color);
        }
        final EditText tytul = (EditText) findViewById(R.id.settitle);
        tytul.setText(title);
        final EditText tresc = (EditText) findViewById(R.id.setcontent);
        tresc.setText(content);
        ImageButton savenote = (ImageButton) findViewById(R.id.addnotebutton);
        savenote.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                database.update(id,tytul.getText(),tresc.getText(),backcolor);
                finish();
            }
        });
    }
}
