﻿export const DESCRIPTIONS = [
  {
    type: "",
    title: "Myszkowski transposition",
    key: "ccp",
    description: `<p>  Victor Théodore Myszkowski, in 1902, propune o varianta de criptare a tipului de sifruri cu transpunere pe coloane. De obicei, aparițiile ulterioare ale unei litere de cuvinte cheie sunt tratate ca și cum următoarea literă în ordine alfabetică, de ex., cuvântul cheie TOMATO produce un șir numeric de „532164”.</p> <p>  În transpunerea lui Myszkowski, literele recurente ale cuvintelor cheie sunt numerotate în mod identic, TOMATO producând un șir de taste „432143”.</p>
<pre>4 3 2 1 4 3
W E A R E D
I S C O V E
R E D F L E
E A T O N C
E          
</pre>
<p>  Coloanele cu text simplu cu numere unice sunt transcrise în jos; cele cu numere recurente sunt transcrise de la stânga la dreapta:</p>
<pre>ROFOA CDTED SEEEA CWEIV RLENE
</pre>
`
  },
  {
    type: "",
    title: "Nihilist cipher",
    key: "ccsm",
    description: `<p>Se construiește un pătrat Polybius folosind un alfabet mixt. Acesta este utilizat pentru a converti atât textul clar, cât și un cuvânt cheie într-o serie de numere din două cifre. Aceste numere sunt apoi adăugate în mod normal pentru a obține textul cifrat, cu numerele cheie repetate după cum este necesar.</p>
<h3>Exemplu:</h3>
<p>Consider the Polybius square created using the keyword ZEBRAS:</p>
<table>
<tbody><tr>
<td>&nbsp;</td>
<td><b>1</b></td>
<td><b>2</b></td>
<td><b>3</b></td>
<td><b>4</b></td>
<td><b>5</b>
</td></tr>
<tr>
<td><b>1</b></td>
<td>Z</td>
<td>E</td>
<td>B</td>
<td>R</td>
<td>A
</td></tr>
<tr>
<td><b>2</b></td>
<td>S</td>
<td>C</td>
<td>D</td>
<td>F</td>
<td>G
</td></tr>
<tr>
<td><b>3</b></td>
<td>H</td>
<td>I</td>
<td>K</td>
<td>L</td>
<td>M
</td></tr>
<tr>
<td><b>4</b></td>
<td>N</td>
<td>O</td>
<td>P</td>
<td>Q</td>
<td>T
</td></tr>
<tr>
<td><b>5</b></td>
<td>U</td>
<td>V</td>
<td>W</td>
<td>X</td>
<td>Y
</td></tr></tbody></table>
<p>cu un text clar al „DYNAMITE WINTER PALACE” și o cheie a RUSSIAN. Aceasta se extinde la:</p>
<pre>PT:  23  55   41  15  35  32  45  12  53   32  41  45  12  14  43  15  34  15  22  12
KEY: 14  51   21  21  32  15  41  14  51   21  21  32  15  41  14  51  21  21  32  15
CT:  37  106  62  36  67  47  86  26  104  53  62  77  27  55  57  66  55  36  54  27
</pre>`
  },
  {
    type: "",
    title: "Playfair cipher",
    key: "ccsp",
    description: `<p>  Spre deosebire de cifrurile cu substituție monoalfabetică, cifrul Playfair criptează perechi de
litere (numite bigrame) și, de aceea, este ceva mai complicat de spart.</p>
<p>La etapa inițială este considerat un tablou bidimensional 5x5, care este completat cu literele unui alfabet mixt, format din literele alfabetului latin, în care o literă cu frecvență de apariție redusă este eliminată (de exemplu, dacă textul clar este în română, este eliminată litera W sau Q, iar dacă textul clar este în engleză – sunt contopite literele I și J). În cazul în care alfabetul textelor clare conține pe lângă literele alfabetului latin și cifrele 0,1,...,9, se va utiliza un tablou 6x6. Alfabetul mixt este generat în baza unui cuvânt cheie din care sunt eliminate literele ce se repetă. Mai întâi urmează cuvântul cheie, apoi celelalte litere ale alfabetului, în ordine alfabetică. Tabloul pentru criptare este completat cu literele alfabetului mixt, acestea fiind scrise de-a lungul unui itinerar fixat (de exemplu, pe orizontală, pe verticală, pe diagonală, în sens orar sau antiorar). Tabloul generat (un pătrat Polybios fără o indexare numerică a liniilor și coloanelor) reprezintă cheia secretă, utilizată atât la criptare, cât și la decriptare.</p>
<h4>Exemplu:</h4>
		<pre>
		Cheia este <strong>'monarchy'</strong>
		Inseram in tabel litera dupa litera (cu exceptia literei j).
		</pre>
		<p>
		<img src='https://media.geeksforgeeks.org/wp-content/uploads/20190818175423/encryption-keysquare-e1566131203550.png'/>
		</p>
<p>  La etapa a doua, textul clar (în care sunt ignorate spațiile) este divizat în blocuri de câte două caractere, numite bigrame, astfel încât literele fiecărui bigram să fie distincte. Această cerință poate fi satisfăcută simplu, prin modificarea textului clar inițial în modul următor: dacă în bigramul examinat curent coincid literele, atunci între acestea se introduce o literă cu o frecvență de apariție redusă în limba în care este scris textul clar. Astfel, este format un nou bigram ce conține prima literă a bigramului inițial și litera de frecvență redusă, iar a doua literă a bigramului inițial este împerecheată cu următoarea literă a textului clar și se verifică, în continuare, dacă acestea sunt distincte. Dacă ultimul bigram nu este completat (adică avem o singură literă), acesta se completează cu litera de frecvență redusă utilizată.</p>
<h3>Exemplu:</h3>
<pre>
<strong>Textul simplu</strong>: 'instruments'
<strong>După divizare</strong>: 'in' 'st' 'ru' 'me' 'nt' 'sz'
</pre>
<p>În a treia etapă, fiecare bigram obținut este criptat, respectând una din următoarele reguli:</p>
<ul>
<li>
	<strong>Dacă ambele litere se află în aceeași coloană</strong>: Luați litera de sub fiecare (revenind la partea de sus dacă este în partea de jos).
	<h4>Exemplu:</h4>
		<pre>
		<strong>Biagramul</strong>: 'me'
		<strong>Textul criptat</strong>: cl
		</pre>
		<p>
			<img src='https://media.geeksforgeeks.org/wp-content/uploads/20190818175431/encryption-of-me.png' />
		</p>
</li>
<li>
	<strong>Dacă ambele litere sunt în același rând</strong>: Luați litera din dreapta fiecăruia (revenind la cea mai stângă dacă se află în poziția cea mai dreaptă).
	<h4>Exemplu:</h4>
	<pre>
		<strong>Biagramul</strong>: 'st'
		<strong>Textul criptat</strong>: tl
		</pre>
		<p>
			<img src='https://media.geeksforgeeks.org/wp-content/uploads/20190818175435/encryption-of-st.png' />
		</p>
</li>
<li>
	<strong>Dacă niciuna dintre regulile de mai sus nu este adevărată</strong>: Formați un dreptunghi cu cele două litere și luați literele pe colțul opus orizontal al dreptunghiului.
	<h4>Exemplu:</h4>
	<pre>
		<strong>Biagramul</strong>: 'nt'
		<strong>Textul criptat</strong>: rq
		</pre>
		<p>
			<img src='https://media.geeksforgeeks.org/wp-content/uploads/20190818175433/encryption-of-nt.png' />
		</p>
</li>
</ul>`
  }
];

/* https://www.geeksforgeeks.org/playfair-cipher-with-examples/

pre, .mw-code {
    color: #000;
    background-color: #f8f9fa;
    border: 1px solid #eaecf0;
    padding: 1em;
    white-space: pre-wrap;
    overflow-x: hidden;
    word-wrap: break-word;
}
.mw-body-content p {
    margin: 0.5em 0;
}
.mw-body-content h3 {
    font-size: 1.2em;
}
.mw-body-content h2 {
    margin-top: 1em;
    font-size: 1.5em;
}
.mw-body h1, .mw-body-content h1, .mw-body-content h2 {
    margin-bottom: 0.25em;
    padding: 0;
    font-family: 'Linux Libertine','Georgia','Times',serif;
    line-height: 1.3;
}

*/
