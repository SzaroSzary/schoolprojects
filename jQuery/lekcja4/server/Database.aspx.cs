using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;
using System.Data;
using System.Text;

public partial class server_Databse : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string connstr = "Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename=|DataDirectory|\\Database.mdf;Integrated Security = True; Connect Timeout = 30";
        SqlConnection conn = new SqlConnection(connstr);
        switch (Request["action"])
        {
            case "create":
                try
                {
                    conn.Open();
                    string sql = "CREATE TABLE hours (id INTEGER, odG VARCHAR(2), odM VARCHAR(2), doG VARCHAR(2), doM VARCHAR(2)) " +
                        "CREATE TABLE subjects (id INTEGER IDENTITY(1,1), kNazPrzedmiotu VARCHAR(3), dNazPrzedmiotu VARCHAR(30)) " +
                        "CREATE TABLE days (id INTEGER, kNazDnia VARCHAR(3), dNazDnia VARCHAR(13)) " +
                        "CREATE TABLE users (id INTEGER IDENTITY(1,1), usrLogin VARCHAR(30), usrPassword VARCHAR(40), usrcolor1 VARCHAR(20), usrcolor2 VARCHAR(20), usrcolor3 VARCHAR(20), usrfont VARCHAR(20)) " +
                        "CREATE TABLE lessons (id INTEGER IDENTITY(1,1), sala VARCHAR(3), days INTEGER, hours INTEGER, subjects INTEGER, users INTEGER)";
                    SqlCommand command = new SqlCommand();
                    command.CommandText = sql;
                    command.Connection = conn;
                    command.ExecuteNonQuery();
                    Response.Write("TABELA UTWORZONA");
                }
                catch (Exception ex)
                {
                    Response.Write("TABELA JUŻ ISTNIEJE" + ex.Message);
                }
                finally
                {
                    conn.Close();
                }
                break;
            case "drop":
                try
                {
                    conn.Open();
                    string sql = "DROP TABLE hours DROP TABLE subjects DROP TABLE days DROP TABLE users DROP TABLE lessons";
                    SqlCommand command = new SqlCommand();
                    command.CommandText = sql;
                    command.Connection = conn;
                    command.ExecuteNonQuery();
                    Response.Write("TABELA USUNIĘTA");
                }
                catch (Exception ex)
                {
                    Response.Write("TABELA JUŻ NIE ISTNIEJE" + ex.Message);
                }
                finally
                {
                    conn.Close();
                }
                break;
            case "insert":
                try
                {
                    conn.Open();
                    string sql = "";
                    SqlCommand command = new SqlCommand();
                    sql = "SELECT COUNT (hours.id) FROM hours";
                    SqlDataAdapter da = new SqlDataAdapter(sql, conn);
                    DataTable dt = new DataTable();
                    StringBuilder sb = new StringBuilder();
                    da.Fill(dt);
                    sb.Append(dt.Rows[0][0]);
                    string y = sb.ToString();
                    if (y != "14")
                    {
                        for (int i = 1; i < 15; i++)
                        {
                            sql = "INSERT INTO hours (id, odG, odM, doG, doM) VALUES(" + i + ", '00', '00', '00', '00')";
                            command.CommandText = sql;
                            command.Connection = conn;
                            command.ExecuteNonQuery();
                        }
                    }
                    sql = "SELECT COUNT (subjects.id) FROM subjects";
                    da = new SqlDataAdapter(sql, conn);
                    dt = new DataTable();
                    sb = new StringBuilder();
                    da.Fill(dt);
                    sb.Append(dt.Rows[0][0]);
                    string x = sb.ToString();
                    if (x != "5")
                    {
                        for (int i = 1; i < 6; i++)
                        {
                            if (i == 1)
                            {
                                sql = "INSERT INTO days (id, kNazDnia, dNazDnia) VALUES(" + i + ", 'PN', 'poniedziałek')";
                            }
                            else if (i == 2)
                            {
                                sql = "INSERT INTO days (id, kNazDnia, dNazDnia) VALUES(" + i + ", 'WT', 'wtorek')";
                            }
                            else if (i == 3)
                            {
                                sql = "INSERT INTO days (id, kNazDnia, dNazDnia) VALUES(" + i + ", 'ŚR', 'środa')";
                            }
                            else if (i == 4)
                            {
                                sql = "INSERT INTO days (id, kNazDnia, dNazDnia) VALUES(" + i + ", 'CZ', 'czwartek')";
                            }
                            else if (i == 5)
                            {
                                sql = "INSERT INTO days (id, kNazDnia, dNazDnia) VALUES(" + i + ", 'PT', 'piątek')";
                            }
                            command.CommandText = sql;
                            command.Connection = conn;
                            command.ExecuteNonQuery();
                        }
                        for (int i = 1; i < 6; i++)
                        {
                            if (i == 1)
                            {
                                sql = "INSERT INTO subjects (kNazPrzedmiotu, dNazPrzedmiotu) VALUES('POL', 'język polski')";
                            }
                            else if (i == 2)
                            {
                                sql = "INSERT INTO subjects (kNazPrzedmiotu, dNazPrzedmiotu) VALUES('MAT', 'matematyka')";
                            }
                            else if (i == 3)
                            {
                                sql = "INSERT INTO subjects (kNazPrzedmiotu, dNazPrzedmiotu) VALUES('ANG', 'język angielski')";
                            }
                            else if (i == 4)
                            {
                                sql = "INSERT INTO subjects (kNazPrzedmiotu, dNazPrzedmiotu) VALUES('APK', 'aplikacje klienckie')";
                            }
                            else if (i == 5)
                            {
                                sql = "INSERT INTO subjects (kNazPrzedmiotu, dNazPrzedmiotu) VALUES('WF', 'wychowanie fizyczne')";
                            }
                            command.CommandText = sql;
                            command.Connection = conn;
                            command.ExecuteNonQuery();
                        }
                    }
                    for (int i = 1; i < 6; i++)
                    {
                        for (int j = 1; j < 15; j++)
                        {
                            sql = "INSERT INTO lessons (sala, days, hours, subjects, users) VALUES('222', " + i + ", " + j + ", " + i + ", (SELECT MAX(users.id) FROM users))";
                            command.CommandText = sql;
                            command.Connection = conn;
                            command.ExecuteNonQuery();
                        }
                    }
                    Response.Write("WIERSZE DODANE");
                }
                catch (Exception ex)
                {
                    Response.Write("TABELA NIE ISTNIEJE" + ex.Message);
                }
                finally
                {
                    conn.Close();
                }
                break;
            case "delete":
                try
                {
                    conn.Open();
                    string sql = "DELETE FROM hours DELETE FROM days DELETE FROM subjects DELETE FROM users DELETE FROM lessons";
                    SqlCommand command = new SqlCommand();
                    command.CommandText = sql;
                    command.Connection = conn;
                    command.ExecuteNonQuery();
                    Response.Write("WIERSZE USUNIĘTE");
                }
                catch (Exception ex)
                {
                    Response.Write("TABELA NIE ISTNIEJE" + ex.Message);
                }
                finally
                {
                    conn.Close();
                }
                break;
            case "download":
                try
                {
                    conn.Open();
                    string sql = "SELECT * FROM hours";
                    SqlDataAdapter da = new SqlDataAdapter(sql, conn);
                    DataTable dt = new DataTable();
                    StringBuilder sb = new StringBuilder();
                    da.Fill(dt);
                    int wiersze = dt.Rows.Count;
                    int kolumny = dt.Columns.Count;
                    sb.Append("{\"godziny\":");
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
                                sb.Append("\"id\":");
                            }
                            if (j == 1)
                            {
                                sb.Append("\"odG\":");
                            }
                            if (j == 2)
                            {
                                sb.Append("\"odM\":");
                            }
                            if (j == 3)
                            {
                                sb.Append("\"doG\":");
                            }
                            if (j == 4)
                            {
                                sb.Append("\"doM\":");
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
                    sb.Append("\t],");
                    sb.AppendLine();
                    Response.Write(sb.ToString());
                    sql = "SELECT lessons.hours, subjects.dNazPrzedmiotu, lessons.sala FROM lessons LEFT JOIN days ON (lessons.days = days.id) LEFT JOIN subjects ON (lessons.subjects = subjects.id) WHERE(lessons.users = 1 AND  lessons.days = " + Request["day"] + ")";
                    da = new SqlDataAdapter(sql, conn);
                    dt = new DataTable();
                    sb = new StringBuilder();
                    da.Fill(dt);
                    wiersze = dt.Rows.Count;
                    kolumny = dt.Columns.Count;
                    sb.Append("\"dzień\":");
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
                                sb.Append("\"lekcja\":");
                            }
                            if (j == 1)
                            {
                                sb.Append("\"przedmiot\":");
                            }
                            if (j == 2)
                            {
                                sb.Append("\"sala\":");
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
                    sb.Append("\t],");
                    sb.AppendLine();
                    Response.Write(sb.ToString());
                    sql = "SELECT subjects.kNazPrzedmiotu, lessons.sala FROM lessons LEFT JOIN subjects ON (lessons.subjects = subjects.id) LEFT JOIN users ON(lessons.users = users.id) WHERE lessons.users = 1";
                    da = new SqlDataAdapter(sql, conn);
                    dt = new DataTable();
                    sb = new StringBuilder();
                    da.Fill(dt);
                    wiersze = dt.Rows.Count;
                    kolumny = dt.Columns.Count;
                    sb.Append("\"tydzień\":");
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
                                sb.Append("\"przedmiot\":");
                            }
                            if (j == 1)
                            {
                                sb.Append("\"sala\":");
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
                    Response.Write("NIE WIEM" + ex.Message);
                }
                finally
                {
                    conn.Close();
                }
                break;
            case "update":
                try
                {
                    conn.Open();
                    string sql = "";
                    switch (Request["oddo"])
                    {
                        case "2":
                            sql = "UPDATE hours SET odG = '" + Request["odG"] + "', odM  = '" + Request["odM"] + "' WHERE id = " + Request["id"];
                            break;
                        case "4":
                            sql = "UPDATE hours SET doG = '" + Request["doG"] + "', doM  = '" + Request["doM"] + "' WHERE id = " + Request["id"];
                            break;
                    }
                    SqlCommand command = new SqlCommand();
                    command.CommandText = sql;
                    command.Connection = conn;
                    command.ExecuteNonQuery();
                    Response.Write("UDALO SIE");
                }
                catch (Exception ex)
                {
                    Response.Write("NIE WIEM" + ex.Message);
                }
                finally
                {
                    conn.Close();
                }
                break;
            case "colors":
                try
                {
                    conn.Open();
                    string sql = "UPDATE users SET usrcolor1 = '" + Request["color2"] + "', usrcolor2  = '" + Request["color3"] + "', usrcolor3  = '" + Request["color4"] + "', usrfont  = '" + Request["font"] + "' WHERE id = " + Request["user"];
                    SqlCommand command = new SqlCommand();
                    command.CommandText = sql;
                    command.Connection = conn;
                    command.ExecuteNonQuery();
                    Response.Write("UDALO SIE");
                }
                catch (Exception ex)
                {
                    Response.Write("NIE WIEM" + ex.Message);
                }
                finally
                {
                    conn.Close();
                }
                break;
            case "downloadcolors":
                try
                {
                    conn.Open();
                    string sql = "SELECT users.usrcolor1, users.usrcolor2, users.usrcolor3, users.usrfont FROM users  WHERE id = "+Request["user"]+"";
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
                break;
            case "currentuser":
                try
                {
                    conn.Open();
                    string sql = "SELECT MAX(users.id) FROM users";
                    SqlDataAdapter da = new SqlDataAdapter(sql, conn);
                    DataTable dt = new DataTable();
                    StringBuilder sb = new StringBuilder();
                    da.Fill(dt);
                    sb.Append(dt.Rows[0][0]);
                    string x = sb.ToString();
                    Response.Write(x);
                }
                catch (Exception ex)
                {
                    Response.Write(ex.Message);
                }
                finally
                {
                    conn.Close();
                }
                break;
        } 
    }
}