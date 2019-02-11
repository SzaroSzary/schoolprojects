package com.example.a4ic1.projektkoncowyskrzypczak.Helpers;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.text.Editable;

import java.util.ArrayList;
import java.util.StringTokenizer;

/**
 * Created by 4ic1 on 2017-10-06.
 */
public class DatabaseManager extends SQLiteOpenHelper {
    //SQLiteDatabase db;
    public DatabaseManager(Context context, String name, SQLiteDatabase.CursorFactory factory, int version) {
        super(context, name, factory, version);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        db.execSQL("CREATE TABLE tabela1 (_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 'tytul' TEXT, 'tresc' TEXT, 'kolor' TEXT, 'sciezka' TEXT)");
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int i, int i1) {
        db.execSQL("DROP TABLE IF EXISTS tabela1");
        onCreate(db);
    }

    public int delete(String id){
        SQLiteDatabase db = this.getWritableDatabase();
        return db.delete("tabela1",
                "_id = ? ",
                new String[]{id});
    }
    public boolean update(String id, Editable tytul, Editable tresc, String kolor){
        SQLiteDatabase db = this.getWritableDatabase();

        ContentValues contentValues = new ContentValues();
        contentValues.put("tytul", ""+tytul);
        contentValues.put("tresc",""+tresc);
        contentValues.put("kolor",""+kolor);

        db.update("tabela1", contentValues, "_id = ? ", new String[]{id});
        db.close();
        return true;
    }
    public boolean insert(String title, String value, String color, String path){

        SQLiteDatabase db = this.getWritableDatabase();

        ContentValues contentValues = new ContentValues();
        contentValues.put("tytul", title);
        contentValues.put("tresc", value);
        contentValues.put("kolor", color);
        contentValues.put("sciezka", path);

        db.insertOrThrow("tabela1", null, contentValues); // gdy insert się nie powiedzie, będzie błąd
        db.close();
        return true;
    }
    public ArrayList<Note> getAll(){
        SQLiteDatabase db = this.getReadableDatabase();
        ArrayList<Note> notes= new ArrayList<>();
        Cursor result = db.rawQuery("SELECT * FROM tabela1" , null);
        while(result.moveToNext()){
            notes.add( new Note(
                    result.getString(result.getColumnIndex("tytul")),
                    result.getString(result.getColumnIndex("tresc")),
                    result.getString(result.getColumnIndex("kolor")),
                    result.getString(result.getColumnIndex("sciezka")),
                    result.getString(result.getColumnIndex("_id"))
            ));
        }
        return notes;
    }
}
