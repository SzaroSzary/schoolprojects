#include <iostream>
#include <fstream>
#include <string>
#include <math.h>

std::ifstream in;
std::ofstream out;

std::string vigenere(std::string tocypher, std::string key, bool cypher)
{
	std::string wholekey = "";
	int repeats = 1;
	int j = 0;
	for(int i=0;i<tocypher.length();i++) 
	{
		char x = tocypher[i];
		if (x>='A' && x<='Z') 
		{
			x = key[j];
			j++;
			if (j==key.length()) 
			{
				j=0;
				repeats++;
			}
		}
		wholekey += x;
	}
	std::cout << "Key repeats " << repeats << " times.\n";
	std::string result="";
	for(int i=0;i<tocypher.length();i++) 
	{
		char x = tocypher[i];
		if (x>='A' && x<='Z') 
		{
			int k = wholekey[i]-int('A');
			if (cypher) 
			{
				x += k;
				if (x>'Z') x -=26;
			}
			else 
			{
				x -= k;
				if (x<'A') x +=26;
			}
		}
		result += x;
	}
	return result;
}

void countletters(std::string cypher, std::string key)
{
	int letters[26];
	for(int i=0;i<26;i++) 
	{
		letters[i]=0;
	}
	for(int i=0;i<cypher.length();i++) 
	{
		if (cypher[i]>='A' && cypher[i]<='Z') 
		{
			int pos = cypher[i] - int('A');
			letters[pos]++;
		}
	}
	std::cout << "Letters counter:\n";
	for(int i=0;i<26;i++)
	{
		std::cout << char(i+int('A')) << " - " << letters[i] << '\n';
	}
	float uppercoin = 0, letincypher = 0, propkeylength = 0, coinindex = 0;
	for(int i=0;i<26;i++)
	{
		uppercoin += letters[i]*(letters[i]-1);
		letincypher += letters[i];
	}
	letincypher = letincypher * (letincypher-1);
	coinindex = uppercoin/letincypher;
	propkeylength = 0.0285/(coinindex-0.0385);
	propkeylength = roundf(propkeylength * 100) / 100;
	std::cout<< "Probable key length: " <<propkeylength << '\n';
	std::cout<< "Exact key length: " <<key.length() << '\n';
}

int main()
{ 
	std::string first = "", key1 = "LUBIMYCZYTAC", result = "";
	in.open("dokad.txt");
	if(in.good())
	{
		while(!in.eof())
		{
			getline(in, first);
		}
		in.close();
	}
	result = vigenere(first, key1,true);
	out.open("odpowiedzi.txt");
	if(out.good())
	{
		out <<"77.1\n\n"<< result << "\n";
		out.close();
	}
	std::string second = "",tempkey = "",key2 = "",temp = "",temp2 = "";
	in.open("szyfr.txt");
	if(in.good())
	{
		getline(in, second);
		while(getline(in, tempkey))
		{
			key2 = tempkey;
		}
		in.close();
	}
	result = vigenere(second, key2,false);
	in.open("odpowiedzi.txt");
	if(in.good())
	{
		while(!in.eof())
		{
			while(getline(in, temp2))
			{
				temp = temp + '\n' +temp2;	
			}
		}
		in.close();
	}
	out.open("odpowiedzi.txt");
	if(out.good())
	{
		out << temp << "\n\n77.2\n\n" << result << "\n";
		out.close();
	}
	countletters(second, key2);
    system("pause");
    return 0;
}
