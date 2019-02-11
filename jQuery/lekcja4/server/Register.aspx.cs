using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class server_Register : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    { 
        string connstr = "Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename=|DataDirectory|\\Database.mdf;Integrated Security = True; Connect Timeout = 30";
        SqlConnection conn = new SqlConnection(connstr);
        try
        {
            conn.Open();
            string sql = "SELECT users.usrLogin, users.usrPassword FROM users WHERE users.usrLogin = @login";
            SqlDataAdapter da = new SqlDataAdapter(sql, conn);
            DataTable dt = new DataTable();
            SqlCommand command = new SqlCommand(sql, conn);
            command.Parameters.AddWithValue("@login", SqlDbType.Int).Value = Request["login"];
            da.SelectCommand = command;
            da.Fill(dt);
            command.CommandText = sql;
            command.Connection = conn;
            command.ExecuteNonQuery();
            if (dt.Rows.Count == 0)
            { 
                sql = "INSERT INTO users (usrLogin, usrPassword, usrcolor1, usrcolor2, usrcolor3, usrfont) VALUES (@login, @haslo, '" + Request["color1"] + "','" + Request["color2"] + "','" + Request["color3"] + "','" + Request["font"] + "')";
                command = new SqlCommand(sql, conn);
                string zaszyfrowane = FormsAuthentication.HashPasswordForStoringInConfigFile(Request["password"], "SHA1");
                command.Parameters.AddWithValue("@login", SqlDbType.Char).Value = Request["login"];
                command.Parameters.AddWithValue("@haslo", SqlDbType.Char).Value = zaszyfrowane;
                command.CommandText = sql;
                command.Connection = conn;
                command.ExecuteNonQuery();
                Response.Write("REJESTRACJA");
            }
            else
            {
                sql = "SELECT users.usrLogin, users.usrPassword FROM [users] WHERE users.usrLogin = @login AND users.usrPassword = @password";
                da = new SqlDataAdapter(sql, conn);
                dt = new DataTable();
                command = new SqlCommand(sql, conn);
                string zaszyfrowane = FormsAuthentication.HashPasswordForStoringInConfigFile(Request["password"], "SHA1");
                command.Parameters.AddWithValue("@login", SqlDbType.Int).Value = Request["login"];
                command.Parameters.AddWithValue("@password", SqlDbType.Int).Value = zaszyfrowane;
                da.SelectCommand = command;
                da.Fill(dt);
                command.CommandText = sql;
                command.Connection = conn;
                command.ExecuteNonQuery();
                sql = "SELECT users.id FROM users WHERE users.usrLogin = '"+Request["login"]+"'";
                da = new SqlDataAdapter(sql, conn);
                dt = new DataTable();
                da.Fill(dt);
                command.CommandText = sql;
                command.Connection = conn;
                command.ExecuteNonQuery();
                if (dt.Rows.Count == 0)
                {
                    Response.Write("BŁĘDNE HASŁO");
                }
                else
                {
                    Response.Write("LOGOWANIE" + dt.Rows[0][0]);
                }
            }
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