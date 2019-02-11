package com.example.a4ic1.projektkoncowyskrzypczak.Helpers;

/**
 * Created by 4ic1 on 2017-10-06.
 */
public class Note
{
    private String tytul;
    private String tresc;
    private String kolor;
    private String sciezka;
    private String id;
    public Note(String title, String value, String color, String path, String id) {
        this.tytul = title;
        this.tresc = value;
        this.kolor = color;
        this.sciezka = path;
        this.id = id;
    }
    public String getTytul() {
        return tytul;
    }
    public void setTytul(String tytul) {
        this.tytul = tytul;
    }
    public String getTresc() {
        return tresc;
    }
    public void setTresc(String tresc) {
        this.tresc = tresc;
    }
    public String getKolor() {
        return kolor;
    }
    public void setKolor(String kolor) {
        this.kolor = kolor;
    }
    public String getSciezka() {
        return sciezka;
    }
    public void setSciezka(String sciezka) {
        this.sciezka = sciezka;
    }
    public String getnoteId() {
        return id;
    }
    public void setnoteId(String id) {
        this.id = id;
    }
}
