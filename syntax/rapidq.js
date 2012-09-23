KateSyntax.langs.rapidq.syntax = {
    default: 'rapidq_normal',
    rapidq_normal: function rapidq_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:abs|acos|asc|asin|atn|atan|bin$|bind|callfunc|chdir|chr$|cint|clng|const|convbase$|cos|data|date$|dec|def|delete$|dim|dir$|direxists|doevents|end|environ|environ$|exp|extractresource|field$|fileexists|fix|format$|frac|hex$|iif|inc|inp|insert$|instr|int|kill|lcase$|left$|len|log|lbound|lflush|lprint|ltrim$|messagedlg|mid$|mkdir|out|playwav|postmessage|quicksort|randomize|read|redim|rem|rename|replace$|replacesubstr$|resource|resourcecount|restore|reverse$|rgb|right$|rinstr|rmdir|rnd|round|rtrim$|run|sendmessage|sgn|shell|showmessage|sin|sizeof|space$|sqr|str$|strf$|string$|swap|tally|tan|time$|timer|ubound|ucase$|val|varptr|varptr$|true|false|sound|call|goto|gosub|sub|function|declare|do|doevent|loop|while|wend|until|if|then|elseif|select|case|functioni|subi|create|type|exit|messagebox|as|string|integer|word|long|byte|off|on|else|gui|for|next|with|mask|and|or|constructor|extends|defint|defstr|static|public|private|event|single|double|to)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:clipboard|printer|qbitmap|qbutton|qcanvas|qcheckbox|qcombobox|qcomport|qcoolbtn|qdirtree|qedit|qfilelistbox|qfilestream|qfont|qfontdialog|qform|qgauge|qglassframe|qgroupbox|qheader|qimage|qimagelist|qlabel|qlistbox|qlistview|qmainmenu|qmemorystream|qmenuitem|qmysql|qnotifyicondata|qopendialog|qoutline|qovalbtn|qpanel|qpopupmenu|qradiobutton|qrect|qregistry|qrichedit|qsavedialog|qscrollbar|qsocket|qsplitter|qstatusbar|qstringgrid|qstringlist|qtabcontrol|qtimer|qtrackbar|qdximagelist|qdxscreen|qdxtimer|qd3dface|qd3dframe|qd3dlight|qd3dmesh|qd3dtexture|qd3dvector|qd3dvisual|qd3dwarp|application|screen|command$|curdir$|sender)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^(?:$apptype|$typecheck|$include|$resource|$define|$undef|$ifdef|$ifndef|$option|$optimize|$escapechars|$EndIf)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^(?:left|top|width|height|open|close|readstring|readinteger|readudt|writestring|writeinteger|writeudt|rootkey|openkey|closekey|flat|cursor|showhint|hint|transparent|caption|onclick|onkeydown|onkeyup|onmousedown|onmouseup|tag|color|onchange|autosize|borderstyle|wordwrap|align|alignment|font|visible|enabled|readline|writeline|additems|addstrings|addstring|delitems|itemcount|itemindex|item|handle|icon|bmphandle|terminate|wndproc|onclose|ontimer|interval|name|size|addstyles|hidetitlebar|show|showmodal|text|button|labelstyle|center|taborder|position|delbordericons|onshow|addbordericons|onkeypress|key|mousex|mousey|onpaint|parent|icohandle|directory|filter|execute|\+|filename|bevelinner|bold|checked|clear|underline|maxlength|inputmask|forecolor||backcolor|deldrivetypes|adddrivetypes|update|bevelouter||loadfromfile|subitem|viewstyle|rowselect|readonly|gridlines||addcolumns|oncolumnclick|ondblclick|addsubitem|scrollbars||addchilditems|plaintext|selstart|sellength|sorted|ColCount||onmoved|groupindex|OnResize|RowCount|cell|TabPosition|KeyPreview|AddTabs|DelTabs|HotTrack|TabIndex|SizeGrip|AddPanels|Panel|DefaultColWidth|FixedCols|AddOptions|Separator|Col|Row|Rectangle|FillRect|Draw|Count|Line|Circle|TextWidth|TextHeight|TextOut|BeginDoc|EndDoc|CopyRect|FilterIndex|SaveToStream|LoadFromStream|PrinterIndex|Orientation|PageWidth|PageHeight|Right|Bottom)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.rapidq_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsComment')) {if(m = this.rapidq_comment())return this.pop(), m-1;continue;}
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    rapidq_comment: function rapidq_comment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    rapidq_string: function rapidq_string(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    }
};
