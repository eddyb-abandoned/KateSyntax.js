KateSyntax.langs.euphoria.syntax = {
    default: 'euphoria_normal',
    euphoria_normal: function euphoria_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\bend\s+for\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bfor\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bend\s+if\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bif\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bend\s+function\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bfunction\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bend\s+procedure\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bprocedure\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bend\s+while\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bwhile\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bend\s+type\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\btype\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:abort|allocate|allocate_string|allow_break|and|and_bits|append|arccos|arcsin|arctan|atom_to_float32|atom_to_float64|as|begin|bits_to_int|bytes_to_int|c_func|c_proc|call|call_back|call_func|call_proc|check_break|chdir|clear_screen|close|command_line|compare|cos|crash_file|crash_message|current_dir|custom_sort|date|define_c_func|define_c_proc|define_c_var|dir|display_text_image|do|else|elsif|end|equal|exit|find|float32_to_atom|float64_to_atom|floor|flush|for|free|free_console|function|get_bytes|get_key|get_mouse|get_position|get_screen_char|getc|getenv|gets|if|include|int_to_bits|int_to_bytes|length|lock_file|log|lower|machine_func|machine_proc|match|mem_copy|mem_set|mouse_events|mouse_pointer|not|not_bits|of|open|open_dll|or|or_bits|peek|peek4|peek4s|peek4u|platform|poke|poke4|position|power|prepend|print|printf|procedure|profile|prompt_number|prompt_string|put_screen_char|puts|rand|read_bitmap|register_block|remainder|repeat|return|reverse|routine_id|save_bitmap|save_text_image|scroll|seek|set_rand|sin|sleep|sort|sprint|sprintf|sqrt|system|system_exec|tan|text_color|then|time|to|trace|type|unlock_file|unregister_block|upper|value|video_config|wait_key|walk_dir|where|while|wildcard_file|wildcard_match|with|without|wrap|xor|xor_bits|\?)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:addto|adjustment|alignment|appendto|append_page|arrow|aspect_frame|button|calendar|cell_renderer_text|cell_renderer_toggle|check|checkbutton|check_menu_item|choice|combo|connect|drawingarea|draw_arc|draw_image|draw_line|draw_polygon|draw_point|draw_rectangle|end_submenu|entry|euget|event_box|flatten|font|frame|get|getImage|getSize|g_list|g_list_to_sequence|deallocate_strings|draw_line|hbox|hbuttonbox|hpaned|hscrollbar|hseparator|hscale|idle_add|image|image_menu_item|init|label|limit|list_store|list_view|list_view_column|main|mark_day|menu|menubar|menu_item|mouse_button|new_gc|new_group|new_menu_group|notebook|option|option_menu|pack|path|pop|progress_bar|push|quit|radio|radiobutton|radio_menu_item|rc_parse|run|separator_menu_item|set|set_submenu|str|scrolled_window|seq_to_str|setfg|setProperty|show|spinbutton|statusbar|table|textbox|timer|togglebutton|toolbar|tooltip|tree_store|tree_view|tree_view_column|vbox|vbuttonbox|vpaned|vscale|vscrollbar|vseparator|when|window|NULL|TRUE|FALSE|color_selection|file_selection|font_selection_dialog|Error|Info|Question|Warn|YesNo)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:atom|constant|global|integer|object|sequence|type)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.euphoria_string())return this.pop(), m-1;continue;}
            if((m = /^--\s*BEGIN.*/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^--\s*END.*/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsComment')) {if(m = this.euphoria_comment())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    euphoria_string: function euphoria_string(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    euphoria_comment: function euphoria_comment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    }
};
