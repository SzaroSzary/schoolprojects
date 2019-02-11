using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;
using System.Text;

public partial class data : System.Web.UI.Page
{
    private string PATH = HttpContext.Current.Server.MapPath("files/test.txt");
    protected void Page_Load(object sender, EventArgs e)
    {
        // linijka konieczna  w razie problemów z dostępem do domeny
        // na której jest strona serwerowa

        Response.AppendHeader("Access-Control-Allow-Origin", "*");
        
        string dane = Request["dane"];
        if ( dane != null)
        {
            Response.Write(" moge zapisać");
            SaveFile(dane);
        }
        else
        {
            Response.Write("brak danych");
        }
        //
    }

    //zapis pliku
    private void SaveFile(string dane)
    {
        //   Response.Write("test");
        StreamWriter writer = new StreamWriter(PATH, true, Encoding.UTF8);
        writer.WriteLine(dane + ",");
        writer.Close();
    }
}