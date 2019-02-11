package com.example.a4ic1.projektkoncowyskrzypczak.Activities;

import android.content.DialogInterface;
import android.content.Intent;
import android.os.Environment;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import com.example.a4ic1.projektkoncowyskrzypczak.Adapters.MyArrayAdapter;
import com.example.a4ic1.projektkoncowyskrzypczak.Helpers.DatabaseManager;
import com.example.a4ic1.projektkoncowyskrzypczak.Helpers.Note;
import com.example.a4ic1.projektkoncowyskrzypczak.R;

import java.io.File;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class NoteActivity extends AppCompatActivity {
    private DatabaseManager database;
    private ListView lv;
    private ArrayAdapter ad;
    private ArrayList<Note> list;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_note);
        ListView listView1 = (ListView) findViewById(R.id.noteslistview);
        listView1.setOnItemLongClickListener(new AdapterView.OnItemLongClickListener() {
            @Override
            public boolean onItemLongClick(AdapterView<?> adapterView, View view, final int pos, long l) {
                AlertDialog.Builder alert = new AlertDialog.Builder(NoteActivity.this);
                alert.setTitle("NOTATKA");
                String notelong[] = {"edytuj", "usun","sortuj wg tytulu","sortuj wg koloru","sortuj wg sciezki"};
                list = database.getAll();
                alert.setItems(notelong,new DialogInterface.OnClickListener(){
                    @Override
                    public void onClick(DialogInterface dialogInterface, int i) {
                        switch (i){
                            case 0:
                                Intent intent = new Intent(NoteActivity.this,NoteEditActivity.class);
                                intent.putExtra("id", database.getAll().get(pos).getnoteId());
                                intent.putExtra("title", database.getAll().get(pos).getTytul());
                                intent.putExtra("content", database.getAll().get(pos).getTresc());
                                startActivity(intent);
                                break;
                            case 1:
                                database.delete(database.getAll().get(pos).getnoteId());
                                list = database.getAll();
                                break;
                            case 2:
                                Collections.sort(list, new Comparator<Note>() {
                                    @Override
                                    public int compare(Note a, Note b) {
                                        return a.getTytul().compareTo(b.getTytul());
                                    }
                                });
                                break;
                            case 3:
                                Collections.sort(list, new Comparator<Note>() {
                                    @Override
                                    public int compare(Note a, Note b) {
                                        return a.getKolor().compareTo(b.getKolor());
                                    }
                                });
                                break;
                            case 4:
                                Collections.sort(list, new Comparator<Note>() {
                                    @Override
                                    public int compare(Note a, Note b) {
                                        return a.getSciezka().compareTo(b.getSciezka());
                                    }
                                });
                                break;
                        }
                        loadnote(list);
                    }
                });
                alert.show();
                return false;
            }
        });
        this.lv = listView1;
        DatabaseManager db = new DatabaseManager(
                NoteActivity.this,
                "NotatkiSkrzypczakRobert.db",
                null,
                6
        );
        this.database = db;
        list = database.getAll();
        loadnote(list);
        getSupportActionBar().hide();
    }
    public void onRestart() {
        super.onRestart();
        list = database.getAll();
        loadnote(list);
    }
    public void loadnote(ArrayList<Note> list){
        MyArrayAdapter adapter = new MyArrayAdapter(
                NoteActivity.this,
                R.layout.notes_row,
                list,
                database
        );
        this.ad = adapter;

        lv.setAdapter(adapter);
    }
}
