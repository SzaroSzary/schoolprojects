package com.example.a4ic1.projektkoncowyskrzypczak.Activities;

import android.content.Intent;
import android.graphics.Point;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.Display;
import android.view.View;
import android.widget.LinearLayout;

import com.example.a4ic1.projektkoncowyskrzypczak.Helpers.ImageData;
import com.example.a4ic1.projektkoncowyskrzypczak.R;

import java.io.Serializable;
import java.util.ArrayList;

public class CollageChooseActivity extends AppCompatActivity implements Serializable {
    private ArrayList<ImageData> list = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_collage_choose);
        LinearLayout collages = (LinearLayout) findViewById(R.id.collages);
        for(int i = 0;i<collages.getChildCount();i++){
            final int finalI = i;
            collages.getChildAt(i).setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    Display display = getWindowManager().getDefaultDisplay();
                    final Point size = new Point();
                    display.getSize(size);
                    switch (finalI){
                        case 0:
                            list.add(new ImageData(0,0,size.x,size.y/3));
                            list.add(new ImageData(0,size.y/3,size.x,size.y/3));
                            list.add(new ImageData(0,2*(size.y/3),size.x,size.y/3));
                            break;
                        case 1:
                            list.add(new ImageData(0,0,2*(size.x/3),size.y/3));
                            list.add(new ImageData(2*(size.x/3),0,size.x/3,size.y/3));
                            list.add(new ImageData(0,size.y/3,size.x/3,size.y/3));
                            list.add(new ImageData(size.x/3,size.y/3,2*(size.x/3),size.y/3));
                            list.add(new ImageData(0,2*(size.y/3),2*(size.x/3),size.y/3));
                            list.add(new ImageData(2*(size.x/3),2*(size.y/3),size.x/3,size.y/3));
                            break;
                        case 2:
                            list.add(new ImageData(0,0,size.x/2,size.y/2));
                            list.add(new ImageData(size.x/2,0,size.x/2,size.y/2));
                            list.add(new ImageData(0,size.y/2,size.x/2,size.y/2));
                            list.add(new ImageData(size.x/2,size.y/2,size.x/2,size.y/2));
                            break;
                    }
                    Intent intent = new Intent(CollageChooseActivity.this,CollageActivity.class);
                    intent.putExtra("list", list);
                    startActivity(intent);
                }
            });
        }
        getSupportActionBar().hide();
    }
    public void onRestart() {
        super.onRestart();
        list.clear();
    }
}
