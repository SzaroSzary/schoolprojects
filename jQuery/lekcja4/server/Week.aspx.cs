using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class server_Week : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string connstr = "Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename=|DataDirectory|\\Database.mdf;Integrated Security = True; Connect Timeout = 30";
        SqlConnection conn = new SqlConnection(connstr);
        try
        {
            conn.Open();
            string sql = "SELECT users.usrcolor1, users.usrcolor2, users.usrcolor3, users.usrfont FROM users WHERE users.id = 1 ";
            SqlDataAdapter da = new SqlDataAdapter(sql, conn);
            DataTable dt = new DataTable();
            StringBuilder sb = new StringBuilder();
            da.Fill(dt);
            int wiersze = dt.Rows.Count;
            int kolumny = dt.Columns.Count;
            sb.Append("{\"kolory\":");
            sb.AppendLine();
            sb.Append("\t[");
            sb.AppendLine();
            for (int i = 0; i < wiersze; i++)
            {
                sb.Append("\t\t{");
                for (int j = 0; j < kolumny; j++)
                {
                    if (j == 0)
                    {
                        sb.Append("\"color2\":");
                    }
                    if (j == 1)
                    {
                        sb.Append("\"color3\":");
                    }
                    if (j == 2)
                    {
                        sb.Append("\"color4\":");
                    }
                    if (j == 3)
                    {
                        sb.Append("\"font\":");
                        sb.Append("\"" + dt.Rows[i][j] + "\"");
                        break;
                    }
                    sb.Append("\"" + dt.Rows[i][j] + "\",");
                }
                if (i == wiersze - 1)
                {
                    sb.Append("}");
                    sb.AppendLine();
                    break;
                }
                sb.Append("},");
                sb.AppendLine();
            }
            sb.Append("\t]");
            sb.AppendLine();
            sb.Append("}");
            Response.Write(sb.ToString());
        }
        catch (Exception ex)
        {
            Response.Write(ex.Message);
        }
        finally
        {
            conn.Close();
        }
    }
}