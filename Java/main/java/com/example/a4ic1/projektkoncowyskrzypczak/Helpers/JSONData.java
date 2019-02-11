package com.example.a4ic1.projektkoncowyskrzypczak.Helpers;

/**
 * Created by 4ic1 on 2017-12-08.
 */
public class JSONData {
    private String imageName;
    private String imageSaveTime;

    public JSONData(String x, String y) {
        this.imageName = x;
        this.imageSaveTime = y;
    }

    public String getX() {
        return imageName;
    }

    public String getY() {
        return imageSaveTime;
    }
}
