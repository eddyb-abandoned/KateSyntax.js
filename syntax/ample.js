KateSyntax.langs.ample.syntax = {
    default: 'ample_normal',
    ample_normal: function ample_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^#pragma/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^(?:break|builtin|case|continue|do|else|extern|local|for|function|if|return|switch|while)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:name|callable|enum|integer|location|name|number|pathname|polylocation|polyrectangle|real|rectangle|status|string|vector)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^(?:optional|default)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^(?:void|undefined|$abort_enable|$dofile_arg1|$dofile_arg2|$dofile_arg3|$dofile_arg4|$dofile_arg5|$dofile_arg6|$dofile_arg7|$dofile_arg8|$dofile_arg9|$dofile_arg10|$dofile_arg11|$dofile_arg12|$dofile_arg13|$dofile_arg14|$dofile_arg15|$dofile_arg16|$dofile_arg17|$dofile_arg18|$dofile_arg19|$dofile_arg20|$dofile_arg_count|$dofile_result|false|off|on|pi|$stderr|$stdin|$stdout|true|two_pi)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#FF0000')) continue;
            if((m = /^(?:quick_help|ref_help)\b/i.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0A7700')) continue;
            if((m = /^(?:abs|acos|$add_complex|$add_status_args|asin|atan|atan2|$bad_status|ceil|$clear_file_error|$close_file|$complex_imaginary|$complex_real|$conjugate_complex|$constrain_value|cos|cosh|cot|$create_complex|$create_string_registry|$create_vector|csc|$current_user|$cvt_exist_file|$cvt_read_variable|$cvt_type|$cvt_write_variable|$date|deg|$divide_complex|$dofile|$e|$eof|exp|$expand_rest|$f|$file_error|$file_exist|$file_pos|$file_status|floor|$flush_file|$format|$free_stream_id|$function_help|$function_ref_help|$function_signature|$g|$generate_rand|$get_ample_status|$get_app_name|$get_app_ver|$get_env|$i|$integer_divide|length|$list_overwritten_functions|$load_library|log|log10|$lower_string|$magnitude_complex|$multiply_complex|$n|$number_string|$open_file|$ord_to_string|$phase_complex|$pop_ample_status|pow|$qsort|rad|$raise_status|$read_file|$reads_file|$real_time|$register_alias|$register_args|$register_command|$resolve_mgc_path|$round|$round_prec|$s|sec|$seek_file|$set_function_status|$set_rand|$set_status|$set_thousands|$set_transcript_mode|sin|sinh|sqrt|$sscanf|$strcat|$strftime|$string_locate|$string_status|$string_to_ord|$subtract_complex|$suspend|$sys_time|$system|tan|tanh|$time|$traceback|$truncate|$type|$undefine_id|$upper_string|$vector_count_range|$vector_element_divide|$vector_element_multiply|$vector_find|$vector_histogram|$vector_integrate|$vector_max|$vector_min|$vector_search|$vector_slope|$vector_sum|$vendor_cpu|$where_is|$write_file|$writeln_file|$writes_file)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0A7700')) continue;
            if((m = /^(?:$add_menu_item|$ask_color|$ask_frame_name|$ask_integer|$ask_number|$ask_pathname|$ask_pattern|$ask_save_edits|$ask_scope_builtin_name|$ask_scope_callable_name|$ask_scope_form_name|$ask_scope_frame_name|$ask_scope_function_name|$ask_scope_keydef_name|$ask_scope_menu_name|$ask_scope_stroke_name|$ask_string|$ask_yes_no|$ask_yes_no_cancel|$bell|$bottom_y|$c_ask_string|$change_location_map_entry|$change_workspace|$cleanup_icons|$cleanup_windows|$clear_message|$clear_saved_prompt|$close_application_windows|$close_physical_transcript|$close_session|$close_window|$collapse_dockable|$compile_userware|$create_form|$create_menu|$create_notepad|$create_prompt|$create_toolbar|$define_color|$define_userware|$delete_menu_item|$delete_stroke|$disable_interrupt|$disable_softkey_update|$dock_dockable|$dockable_collapsed|$dockable_docked|$dockable_permission|$dockable_pinned|$dockable_visible|$dockables_all_hidden|$dockables_all_shown|$dockables_locked|$double_click_distance|$edit_source|$enable_help|$enable_interrupt|$enable_ref_help|$enable_softkey_update|$eval|$execute|$execute_dynamic|$execute_last_menu|$execute_promptbar|$execute_ref|$execute_stroke|$expand_command|$float_dockable|$forget|$forget_all_promptbars|$forget_promptbar|$form_action|$form_action_buttons_gadget|$form_actual_value|$form_argument|$form_argument_gadget|$form_argument_integer_entry_gadget|$form_argument_number_entry_gadget|$form_argument_string_entry_gadget|$form_argument_value|$form_button|$form_check_boxes_gadget|$form_choice_buttons_gadget|$form_choice_stepper_gadget|$form_click_button_gadget|$form_color_paint_chip_gadget|$form_colors_list_box_gadget|$form_column|$form_display_only|$form_display_text_gadget|$form_dynamic_list_box_gadget|$form_entry_box_gadget|$form_execute_buttons|$form_gadget_value|$form_horiz_dynamic_list_box_gadget|$form_horiz_list_box_gadget|$form_item|$form_label|$form_left_justified_column|$form_list_box_gadget|$form_mouse_tracking|$form_named_argument|$form_named_argument_gadget|$form_navigator_entry|$form_navigator_gadget|$form_number_entry_box_gadget|$form_patterns_list_box_gadget|$form_prompt_text_gadget|$form_push_button_gadget|$form_radio_buttons_gadget|$form_repeat|$form_right_justified_column|$form_row|$form_scope_list_box_gadget|$form_set_no_enter|$form_single_check_box_gadget|$form_string_entry_box_gadget|$form_switch|$form_target_action|$form_target_button|$form_text_entry_box_gadget|$form_variable|$form_variable_gadget|$frame_maximized|$frame_window|$get_action_bar_bgd_color|$get_action_bar_fgd_color|$get_active_color|$get_active_window|$get_additional_workspaces|$get_app_name_and_version|$get_app_name_no_version|$get_auto_pop|$get_auto_refresh|$get_auto_resize_palette|$get_autosave|$get_base_window|$get_bgd_color|$get_border_width|$get_current_profile|$get_cursor_colors|$get_cursor_shape|$get_default_method|$get_default_notepad_font|$get_double_click_interval|$get_expanded_pathname|$get_fgd_color|$get_focus_follows_mouse|$get_focus_follows_mouse_delay|$get_font_nominal_width|$get_form_gadget_value|$get_frame_collapsed|$get_graphic_device|$get_keyboard_type|$get_last_window|$get_message_lines|$get_message_popup|$get_message_reply|$get_message_transcript|$get_notepad_document_status|$get_open_windows|$get_palette_menu_visible|$get_pattern|$get_prompt_fonts|$get_server_switch|$get_sidetab_color|$get_tabbed_workspace_trim_right|$get_text_cursor_blink|$get_transcript_output|$get_window_border_width|$get_window_frame_extent|$get_window_frame_width|$get_workspace|$graphic_x|$graphic_y|$grow_window|$help|$help_context|$help_enabled|$hide_all_dockables|$hide_command_shell|$hide_dockable|$hide_menu_bar|$hide_message_area|$hide_palette|$hide_palette_scrolls|$hide_scrolls|$hide_softkey_labels|$hide_softkeys|$hide_transcript|$hide_window_title|$identify_interrupt|$insert_menu_item|$key_|$left_x|$load_profile|$load_userware|$location|$lock_dockables|$mark|$maximize_window|$menu_bar_item|$menu_bar_visible|$menu_context_item|$menu_name|$menu_parent_name|$menu_registered_item|$menu_separator_item|$menu_special_text_item|$menu_text_item|$menu_title_item|$message|$message_area_visible|$minimize_window|$move_cursor|$move_dockable|$move_dockable_into|$move_palette|$move_window|$next_field|$next_field_promptbar|$next_icon|$next_window|$open_notepad|$open_physical_transcript|$open_text_report|$option_form_promptbar|$palette_visible|$pause|$pin_dockable|$pop_window|$pop_window_to_top|$popup_command_line|$popup_last_menu|$popup_menu|$popup_menu_at_cursor|$popup_menu_bar|$popup_window_menu|$prev_field|$prev_field_promptbar|$prompt|$prompt_arg|$prompt_display|$prompt_dynamic|$prompt_for_location|$prompt_for_polylocation|$prompt_for_polyrectangle|$prompt_for_rectangle|$prompt_options|$read_cpu_timer|$read_cpu_timer_total|$read_map|$read_timer|$read_timer_total|$redirect_to_active_window|$ref_help|$ref_help_enabled|$refresh|$relative_location|$remove_profile|$replace_palette|$replay_physical_transcript|$report_color|$report_key|$report_stroke|$reposition_window|$reset|$reset_defaults|$reset_timer|$resize_palette|$restore_default_profile|$result|$resume|$right_x|$save_profile|$save_profile_as|$screen_x|$screen_y|$scroll_down_by_unit|$scroll_down_by_window|$scroll_hz|$scroll_left_by_unit|$scroll_left_by_window|$scroll_right_by_unit|$scroll_right_by_window|$scroll_to_bottom|$scroll_to_left|$scroll_to_right|$scroll_to_top|$scroll_up_by_unit|$scroll_up_by_window|$scroll_vt|$scrolls_visible|$select|$select_active_window|$send_ipc|$session_window_active|$set_action_bar_bgd_color|$set_action_bar_fgd_color|$set_active_color|$set_active_window|$set_additional_workspaces|$set_auto_pop|$set_auto_refresh|$set_auto_resize_palette|$set_autosave|$set_base_window|$set_bgd_color|$set_border_width|$set_cmd_line_font|$set_cursor_colors|$set_cursor_shape|$set_default_method|$set_default_notepad_font|$set_default_position|$set_double_click_distance|$set_double_click_interval|$set_fgd_color|$set_focus_follows_mouse|$set_focus_follows_mouse_delay|$set_form_gadget_value|$set_form_position|$set_frame_width|$set_graphic_device|$set_invert_text_color_on_highlight|$set_ipc_port|$set_ipc_wakeup_interval|$set_left_justify_palette_text|$set_list_gadget_double_click_action|$set_menu_rollover_color|$set_message_font_resize|$set_message_lines|$set_message_popup|$set_message_reply|$set_message_transcript|$set_palette_width|$set_pattern|$set_prompt_fonts|$set_sidetab_color|$set_softkey_bgd_color|$set_softkey_fgd_color|$set_softkey_font|$set_tabbed_workspace_trim_right|$set_text_cursor_blink|$set_transcript_output|$set_window_border_width|$set_window_frame_width|$set_working_directory|setup_registered_commands|$show_all_dockables|$show_command_shell|$show_dockable|$show_location_map|$show_menu_bar|$show_message_area|$show_palette|$show_palette_scrolls|$show_parent_palette|$show_scrolls|$show_softkey_labels|$show_softkeys|$show_sub_palette|$show_toolbar_icons|$show_toolbar_text|$show_top_palette|$show_transcript|$show_window_title|$show_workspace_tab|$softkey_bgd_color|$softkey_fgd_color|$softkey_font|$softkeys_visible|$source|$start_stroke|$start_stroke_location|$start_timer|$stop|$stop_stroke|$stop_stroke_location|$stop_timer|$stroke_extent|$stroke_identity|$stroke_|$target_name|$title_visible|$toolbar_action_selector_item|$toolbar_add_item|$toolbar_associative_item|$toolbar_combo_box_item|$toolbar_insert_item|$toolbar_label_item|$toolbar_n_state_item|$toolbar_registered_item|$toolbar_remove_item|$toolbar_separator_item|$toolbar_text_field_item|$toolbar_text_icon_item|$top_y|$transcript_visible|$ui_message_ask_yes_no|$ui_message_fail|$update_menu_bar|$update_palette|$update_softkey_labels|$update_toolbars|$use_animations|$user_init|$user_pre_init|$user_window_init|$using_animations|$version|$wait|$window_class_name|$window_extent|$window_init|$window_interior_extent|$window_scope_name|$window_visible|$writeln)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0A7700')) continue;
            if((m = /^(?:$acquire_license|$activate_net|$activate_net_by_handle|$activate_net_by_name|$activate_port|$activate_port_by_handle|$activate_port_by_name|$add_cell|$add_contacts|$add_device|$add_fp_shape|$add_group_property|$add_metal|$add_multiple_text|$add_net_members_to_ports|$add_overflow|$add_overflow_by_handle|$add_panel|$add_path|$add_path_device|$add_point_device|$add_property|$add_property_group_members|$add_property_group_selections|$add_property_text|$add_route|$add_row|$add_rows_by_area|$add_ruler|$add_shape|$add_shape_device|$add_text|$add_text_on_ports|$add_to_library|$add_to_net|$add_to_port|$add_via|$align|$apply_print_vector_attributes|$attach_library|$autofloorplan|$autoplace_blocks|$autoplace_corner_cells|$autoplace_group|$autoplace_pins|$autoplace_ports|$autoplace_power_vias|$autoplace_standard_cells|$autoroute_all|$autoroute_nets|$autoroute_overflow|$backannotate_net_parameters|$build_hotplot_setup|$build_lib|$build_ports|$build_ports_shapes|$build_ports_text_location|$build_power_strap_shapes|$build_power_straps|$build_read_gdsii_optfile|$change_array|$change_aspect|$change_cursor_status|$change_device|$change_from_object_template|$change_group_property|$change_layer|$change_net|$change_object_attributes|$change_object_template|$change_overflow|$change_overflow_by_handle|$change_path|$change_port|$change_property|$change_property_group_members|$change_property_group_selections|$change_property_text|$change_row|$change_text|$change_via_type|$change_window|$checkpoint_cell|$checkpoint_cell_by_name|$check_drc|$check_fn|$check_instances|$check_overflows|$check_polygons|$check_power_pins|$check_preconditions|$check_shorts_all|$check_shorts_selected|$clear_clipboard|$close_layout_library|$close_logic|$close_selection|$close_session|$close_window|$compact|$compose_groups|$compose_layer_geometries|$compose_layer_selections|$connect_instance|$convert_dracula|$copy|$copy_edit_hotkey_settings|$copy_relative|$copy_to_clipboard|$copy_to_fp_layer|$copy_to_layer|$create_cell|$create_def_from_layout_view|$create_layout_library|$create_layout_view|$create_layout_view_from_def|$create_layout_view_from_lef|$create_layout_view_from_verilog|$create_lef_from_layout_library|$create_lef_from_layout_view|$create_library|$create_process|$create_toolbar|$create_via_cell|$create_viewpoint|$cut|$cut_stretch|$deactivate|$define_hotkey|$define_layer_alias|$define_layer_name|$define_layer_set|$define_max_gate_width|$define_mos_site_type|$define_must_connect|$define_net_pair|$define_net_shield|$define_route_transform|$delete|$delete_area|$delete_connectivity|$delete_drc_all|$delete_drc_area|$delete_drc_check|$delete_drc_current|$delete_drc_point|$delete_drc_scan|$delete_from_library|$delete_group_property|$delete_lvs_results|$delete_panel|$delete_property|$delete_property_group_members|$delete_property_group_selections|$delete_routing|$delete_ruler|$delete_rulers_all|$detach_library|$display_channels|$does_cell_exist|$edit_library|$edit_process|$edit_process_override|$enable_edit_layout_library|$export_drc_check|$extract_cell_connectivity|$extract_direct_distributed_parameters|$extract_direct_lumped_parameters|$extract_mask_distributed_parameters|$extract_mask_lumped_parameters|$fillet|$fillet_area|$filter_group|$fit_fp_shape|$flatten|$flatten_hierarchy|$flip|$flip_in_place|$flip_on_axis|$form_ic_action_buttons_gadget|$form_ic_color_paint_chip_gadget|$form_ic_display_gadget|$form_ic_layer_palette_gadget|$form_ic_patterns_list_box_gadget|$form_single_check_box_gadget|$fracture|$freeze_window|$get_absolute_points|$get_acap_info|$get_active_ic_window|$get_active_net|$get_active_port|$get_arc|$get_area|$get_area_estimate|$get_array_value|$get_auto_checkpoint|$get_basepoint|$get_bottom_orient_set|$get_boundary|$get_cap_extent|$get_cap_neg_pin|$get_cap_pos_pin|$get_cell_boundary|$get_cell_configuration|$get_cell_equivalents|$get_cell_info|$get_cell_list_dts|$get_cell_path|$get_cell_refs|$get_cell_xrefs|$get_circle|$get_closed_polygon|$get_closest_object_location|$get_closest_object_points|$get_compact_add_blkgs|$get_compact_jog_power|$get_compose_layer_geometries|$get_compose_layer_selections|$get_connectivity_layers|$get_containment|$get_context_contrast|$get_context_from_world|$get_crosshair_target_radius|$get_crosshair_target_style|$get_def_bus_bit_characters|$get_def_bus_bit_characters|$get_def_divider_character|$get_def_divider_character|$get_def_non_orthogonal|$set_def_non_orthogonal|$get_design_layers|$get_design_path|$get_design_refs|$get_dev_info|$get_dev_layer|$get_dev_rule|$get_device_alias|$get_device_iobj|$get_device_name|$get_drc_check_current_count|$get_drc_check_original_count|$get_drc_check_polygon_count|$get_drc_check_scan_count|$get_drc_current_result_check_name|$get_drc_current_result_number|$get_drc_current_result_points|$get_drc_current_result_type|$get_drc_default_layer_directory_name|$get_drc_default_summary_report_file_name|$get_drc_results_database_check_count|$get_drc_results_database_check_names|$get_drc_results_database_nonempty_check_names|$get_drc_results_database_result_count|$get_drc_results_database_scan_check_names|$get_drc_results_database_scan_result_count|$get_endangered_nets|$get_externals_info|$get_fp_compute_num_rows|$get_fp_compute_route_area_ratio|$get_fp_extend_row|$get_fractured_rectangles|$get_gadget_value|$get_graphic_preempt_list|$get_group_members|$get_group_names|$get_group_property_names|$get_highlight_count|$get_hotkey_settings|$get_ic_cell_windows|$get_ic_location|$get_ic_window_names|$get_instance_extent|$get_instance_fp_extent|$get_instance_version|$get_internal_row_layout|$get_internal_row_sequence|$get_layer_info|$get_layer_minimum_spacing|$get_layer_minimum_width|$get_layer_names|$get_layer_number|$get_layer_palette_height|$get_layers|$get_layout_counterpart|$get_layout_window|$get_lef_bus_bit_characters|$get_lef_bus_bit_characters|$get_lef_divider_character|$get_lef_divider_character|$get_lef_non_orthogonal|$set_lef_non_orthogonal|$get_lef_overlap_boundary|$set_lef_overlap_boundary|$get_left_orient_set|$get_library_cells|$get_licenses|$get_loaded_logic|$get_logic_counterpart|$get_mark|$get_mask_device_count|$get_mask_discrepancy_count|$get_mask_net_count|$get_mos_gate_pin|$get_mos_sd_extent|$get_mos_sd_pin|$get_nearest_edge|$get_net_members|$get_new_object_handles|$get_object_extent|$get_object_info|$get_outdated_cells|$get_outline|$get_panel_extent|$get_panel_names|$get_parameter_default|$get_peek_protected|$get_perimeter|$get_pid|$get_pin_members|$get_pins|$get_points|$get_port_members|$get_process|$get_process_override|$get_property_handles|$get_property_names|$get_property_value|$get_report_obj_types|$get_report_options|$get_res_extent|$get_res_neg_pin|$get_res_pos_pin|$get_reserved|$get_right_orient_set|$get_rotation_point|$get_router_add_blkgs|$get_router_align_cells|$get_router_align_mode|$get_router_block_feed_percent|$get_router_block_stub_mode|$get_router_cell_feed_percent|$get_router_channel_ocr|$get_router_connect_blk_pwr|$get_router_constrain_power|$get_router_create_power_grid|$get_router_limit_area|$get_router_overflow_mode|$get_router_pre_route|$get_router_preserve_power_width|$get_router_probe_extent_margin|$get_router_x_margin|$get_router_y_margin|$get_row_members|$get_rule_file_check_count|$get_rule_file_check_names|$get_rule_file_select_check_count|$get_rule_file_select_check_names|$get_select_area|$get_select_cell|$get_select_count|$get_select_extent|$get_select_set|$get_selectable_layers|$get_selected_edges|$get_short_segment|$get_snapped_points|$get_status_line_info|$get_top_orient_set|$get_traced_properties_numeric|$get_traced_properties_string|$get_visible_layers|$get_window_cell|$get_window_info|$get_world_from_context|$get_world_from_screen|$group|$group_by_name|$group_by_property|$group_on_selected|$group_text|$hide_layer_palette|$hide_status_line|$hide_system_toolbar|$hide_toolbar|$hide_tooltips|$highlight_all|$highlight_all_discrepancies|$highlight_all_incorrect|$highlight_all_unmatched|$highlight_by_location|$highlight_by_name|$highlight_by_property|$highlight_current_discrepancy|$highlight_discrepancy|$highlight_first_discrepancy|$highlight_group|$highlight_hierarchical_net|$highlight_next_discrepancy|$highlight_on_selected|$highlight_previous_discrepancy|$highlight_protected|$hotplot|$hotplot_invoke|$insert_posts|$iroute|$is_cell_outdated|$is_cell_reserved|$is_cell_salvage_pending|$is_edge_selected|$is_history_active|$is_layer_palette_visible|$is_library_reserved|$is_licensed|$is_process_reserved|$is_select_set_closed|$is_status_line_visible|$is_toolbar_visible|$link_floorplan_shape|$list_drc_all|$list_drc_check|$list_drc_selected|$load_design_hierarchy|$load_hotkey_settings|$load_logic|$load_mask_results|$load_process|$load_rules|$loc|$lvs_direct|$lvs_mask|$make_array|$make_cell|$make_font|$make_keypad_panels|$make_net|$make_port|$mark_instances_as_ignored|$measure_distance|$merge|$mgc_scope_name_pre_init|$minimize_levels|$minimize_vias|$modify_centerline|$move|$move_acap|$move_cursor_down|$move_cursor_left|$move_cursor_right|$move_cursor_up|$move_in_row|$move_on_row|$move_relative|$msg_cell_route_hierarchy_mode|$notch|$notch_special|$open_cell|$open_cell_map|$open_clipboard|$open_context_cell|$open_group_window|$open_hierarchy_window|$open_layout_library|$open_layout_view|$open_logic|$open_logic_by_name|$open_mask_logic|$open_selected_cell|$partition_hierarchy|$paste|$peek|$peek_area|$place|$place_on_row|$place_schematic_instances|$place_schematic_ports|$polygon_to_path|$print_cell|$prompt_for_ic_line|$prompt_for_ic_location|$prompt_for_ic_polygon|$prompt_for_ic_polyline|$prompt_for_ic_rectangle|$prompt_for_ic_route|$protect|$protect_group|$protect_nets|$read_def|$read_gdsii|$read_lef|$read_spice|$read_verilog|$read_xml|$redo|$redraw|$redraw_area|$regenerate_device|$release_license|$reload_cell|$reload_cell_by_name|$remove_contacts_by_area|$remove_contacts_by_m2|$remove_contacts_by_via|$remove_from_net|$remove_from_port|$remove_metal_by_area|$reopen_selection|$repeat_fn|$repeat_objects|$replace_cell|$replace_toolbar|$report_active_context|$report_all_mask_devices|$report_all_mask_nets|$report_capacitor_type|$report_cell|$report_cell_list_dts|$report_current_direct_net|$report_current_discrepancy|$report_current_mask_device|$report_current_mask_discrepancy|$report_current_mask_net|$report_design_layers|$report_design_tree|$report_design_xref|$report_direct_thresholds|$report_drc_all|$report_drc_area|$report_drc_check|$report_drc_current|$report_drc_point|$report_drc_scan|$report_eco_results|$report_gb_type|$report_group|$report_group_names|$report_hotkey_settings|$report_layer_attributes|$report_layer_sets|$report_library|$report_licenses|$report_logic|$report_lvs_results|$report_mask_results|$report_mask_thresholds|$report_mos_type|$report_net_parameters|$report_nets|$report_outdated_cells|$report_panels|$report_paired_nets|$report_peek_protected|$report_place_route|$report_ports|$report_process|$report_property_names|$report_reserved|$report_resistor_type|$report_row_capacity|$report_scoring|$report_selected|$report_shown_mask_devices|$report_shown_mask_discrepancies|$report_shown_mask_nets|$report_text_file|$report_via_type|$report_windows|$reselect|$reserve_cell|$reserve_cell_by_name|$reserve_library|$reserve_process|$reset_basepoint|$reset_licensing|$resize|$restore_defaults|$restore_drc_results|$restructure_nets|$resync_cell|$resync_cell_by_name|$resync_library|$resync_viewpoint|$rotate|$route_point_to_point|$rule_file_loaded|$run_eco|$salvage_cell|$salvage_reference|$save_cell|$save_cell_as|$save_cell_by_name|$save_drc_results|$save_layout_library|$save_library|$save_process|$save_process_by_name|$save_setup|$scale_cells|$scale_context|$scan_drc_all|$scan_drc_check|$sdl_cleanup|$sdl_create_cell|$select_all|$select_area|$select_area_polygon|$select_by_name|$select_by_property|$select_drc_all|$select_drc_check|$select_edge|$select_fixed_routes|$select_folds|$select_group|$select_highlighted|$select_ignored_instances|$select_on_selected|$select_one|$select_range|$select_text|$select_unplaced_schematic_instances|$select_unplaced_schematic_ports|$send_to_prompt|$set_active_port_style|$get_active_port_style|$set_active_ruler_layer|$get_active_ruler_layer|$set_add_route_alignment|$get_add_route_alignment|$set_add_route_checking|$get_add_route_checking|$set_add_route_padding|$get_add_route_padding|$set_angle_mode|$set_angle_mode_enforcement|$get_angle_mode_enforcement|$set_anneal_cooling_factor|$get_anneal_cooling_factor|$set_arc_segments|$get_arc_segments|$set_array_display_style|$get_array_display_style|$set_auto_focus_active_window|$get_auto_focus_active_window|$set_auto_outline_mode|$get_auto_outline_mode|$set_auto_restructure|$get_auto_restructure|$set_autonotch|$get_autonotch|$set_autoselect|$get_autoselect|$set_basepoint|$set_cell_configuration|$set_cell_logical_name|$set_cell_origin|$set_cell_process|$set_cell_route_hierarchy_mode|$set_cell_type|$set_check_drc_message_mode|$set_circle_input_style|$get_circle_input_style|$set_click_distance|$get_click_distance|$set_compact_center_wires|$get_compact_center_wires|$set_compact_corner_spacing|$get_compact_corner_spacing|$set_compact_cost_factor|$get_compact_cost_factor|$set_compact_ext_cells|$get_compact_ext_cells|$set_compact_ext_rows|$get_compact_ext_rows|$set_compact_jogs|$get_compact_jogs|$set_compact_offset_vias|$get_compact_offset_vias|$set_compact_path_mini|$get_compact_path_mini|$set_compact_route_levels|$get_compact_route_levels|$set_compact_suppress_output|$get_compact_suppress_output|$set_compact_to|$get_compact_to|$set_compact_wires_mode|$get_compact_wires_mode|$set_contact_count|$set_context|$set_context_up|$set_copy_ports_on_copy|$get_copy_ports_on_copy|$set_cross_probe|$get_cross_probe|$set_cross_probe_mode|$set_crosshair_style|$get_crosshair_style|$set_crosshair_target|$set_crosshair_target_radius|$set_cull|$set_def_bus_bit_characters|$set_def_divider_character|$set_def_non_orthogonal|$set_direct_thresholds|$set_display_window_title|$get_display_window_title|$set_drag_complexity|$get_drag_complexity|$set_drag_ruler_mode|$get_drag_ruler_mode|$set_drc_check|$set_drc_first|$set_drc_fit_factor|$set_drc_jump|$set_drc_last|$set_drc_next|$set_drc_previous|$set_drc_result|$set_drc_skip|$set_duplicate_ports_policy|$set_dynamic_drc|$get_dynamic_drc|$set_dynamic_drc_complexity|$get_dynamic_drc_complexity|$set_dynamic_hotkey_mode|$get_dynamic_hotkey_mode|$set_dynamic_loading|$get_dynamic_loading|$set_dynamic_message_mode|$get_dynamic_message_mode|$set_dynamic_pre_locations|$set_error_handling|$get_error_handling|$set_fill_display|$get_fill_display|$set_filled_layers|$get_filled_layers|$set_first_direct_net|$set_first_mask_device|$set_first_mask_discrepancy|$set_first_mask_net|$set_fp_bottom_gap|$get_fp_bottom_gap|$set_fp_left_gap|$get_fp_left_gap|$set_fp_lower_aspect|$get_fp_lower_aspect|$set_fp_max_height|$get_fp_max_height|$set_fp_max_width|$get_fp_max_width|$set_fp_num_rows|$get_fp_num_rows|$set_fp_right_gap|$get_fp_right_gap|$set_fp_route_area_ratio|$get_fp_route_area_ratio|$set_fp_top_gap|$get_fp_top_gap|$set_fp_upper_aspect|$get_fp_upper_aspect|$set_fractured_route|$get_fractured_route|$set_gadget_value|$set_gate_size|$set_gds_allanglefracture|$get_gds_allanglefracture|$set_gds_anglemode|$get_gds_anglemode|$set_gds_auto_identify_vias|$get_gds_auto_identify_vias|$set_gds_cellnamecase|$get_gds_cellnamecase|$set_gds_cellnamelength|$get_gds_cellnamelength|$set_gds_cellnamemap|$get_gds_cellnamemap|$set_gds_fixpolygons|$get_gds_fixpolygons|$set_gds_layerfilter|$get_gds_layerfilter|$set_gds_layermap|$get_gds_layermap|$set_gds_library|$get_gds_library|$set_gds_lockcells|$get_gds_lockcells|$set_gds_logfile|$get_gds_logfile|$set_gds_process|$get_gds_process|$set_gds_properties|$get_gds_properties|$set_gds_read_scale|$get_gds_read_scale|$set_gds_replace|$get_gds_replace|$set_gds_save_cells|$get_gds_save_cells|$set_gds_skipunmapped|$get_gds_skipunmapped|$set_gds_textheightmap|$get_gds_textheightmap|$set_gds_transcript|$get_gds_transcript|$set_graphic_interrupt|$get_graphic_interrupt|$set_gravity_distance|$get_gravity_distance|$set_grid|$set_guideline_net_size|$get_guideline_net_size|$set_guideline_width_limit|$get_guideline_width_limit|$set_hocr|$get_hocr|$set_hotkey_mode|$get_hotkey_mode|$set_ic_array_columns|$get_ic_array_columns|$set_ic_array_rows|$get_ic_array_rows|$set_ic_aspect|$get_ic_aspect|$set_ic_cell_flip|$get_ic_cell_flip|$set_ic_cell_orientation|$get_ic_cell_orientation|$set_ic_cell_rotation|$get_ic_cell_rotation|$set_ic_cell_scale|$get_ic_cell_scale|$set_ic_layer|$get_ic_layer|$set_ic_path_end_style|$get_ic_path_end_style|$set_ic_path_old_style|$get_ic_path_old_style|$set_ic_path_padding|$get_ic_path_padding|$set_ic_path_style|$get_ic_path_style|$set_ic_path_width|$get_ic_path_width|$set_ic_property_owner|$get_ic_property_owner|$set_ic_property_replace|$get_ic_property_replace|$set_ic_property_text_height|$get_ic_property_text_height|$set_ic_property_text_horz_just|$get_ic_property_text_horz_just|$set_ic_property_text_orientation|$get_ic_property_text_orientation|$set_ic_property_text_vert_just|$get_ic_property_text_vert_just|$set_ic_row_auto_resize|$get_ic_row_auto_resize|$set_ic_row_justification|$get_ic_row_justification|$set_ic_row_site|$get_ic_row_site|$set_ic_row_slideable|$get_ic_row_slideable|$set_instance_extent_display|$get_instance_extent_display|$set_instance_name_display|$get_instance_name_display|$set_instance_origin_display|$get_instance_origin_display|$set_instance_route_hierarchy_mode|$set_iobj_points|$set_iroute_accept_at_current_loc|$set_iroute_auto_shield|$set_iroute_checking|$set_iroute_push_mode|$set_iroute_route_transforms|$set_iroute_select_with_active_layer|$set_iroute_show_alignment|$set_iroute_show_ortho_path|$set_iroute_via_generator_is_default|$set_iroute_width_change|$set_join_on_move|$get_join_on_move|$set_layer_appearance|$set_layer_palette_height|$get_layer_palette_height|$set_layer_path_width|$set_lef_bus_bit_characters|$get_lef_bus_bit_characters|$set_lef_divider_character|$get_lef_divider_character|$set_lef_non_orthogonal|$get_lef_non_orthogonal|$set_lef_overlap_boundary|$get_lef_overlap_boundary|$set_library_cell_type|$set_library_site_types|$set_location_mode|$get_location_mode|$set_logic_source|$set_logical_correspondence|$set_lvs_all_capacitor_pins_swappable|$get_lvs_all_capacitor_pins_swappable|$set_lvs_component_subtype_property|$get_lvs_component_subtype_property|$set_lvs_component_type_properties|$get_lvs_component_type_properties|$set_lvs_default_direct_source_subname|$get_lvs_default_direct_source_subname|$set_lvs_default_mask_source_subname|$get_lvs_default_mask_source_subname|$set_lvs_default_report_name|$get_lvs_default_report_name|$set_lvs_filter_unused_bipolar_transistors|$get_lvs_filter_unused_bipolar_transistors|$set_lvs_filter_unused_mos_transistors|$get_lvs_filter_unused_mos_transistors|$set_lvs_ground_names|$get_lvs_ground_names|$set_lvs_ignore_ports|$get_lvs_ignore_ports|$set_lvs_pin_name_properties|$get_lvs_pin_name_properties|$set_lvs_power_names|$get_lvs_power_names|$set_lvs_recognize_gates|$get_lvs_recognize_gates|$set_lvs_recognize_only_simple_gates|$get_lvs_recognize_only_simple_gates|$set_lvs_reduce_parallel_bipolar_transistors|$get_lvs_reduce_parallel_bipolar_transistors|$set_lvs_reduce_parallel_capacitors|$get_lvs_reduce_parallel_capacitors|$set_lvs_reduce_parallel_diodes|$get_lvs_reduce_parallel_diodes|$set_lvs_reduce_parallel_mos_transistors|$get_lvs_reduce_parallel_mos_transistors|$set_lvs_reduce_parallel_resistors|$get_lvs_reduce_parallel_resistors|$set_lvs_reduce_series_capacitors|$get_lvs_reduce_series_capacitors|$set_lvs_reduce_series_resistors|$get_lvs_reduce_series_resistors|$set_lvs_reduce_split_gates|$get_lvs_reduce_split_gates|$set_lvs_report_list_limit|$get_lvs_report_list_limit|$set_lvs_write_instance_cross_reference|$get_lvs_write_instance_cross_reference|$set_lvs_write_net_cross_reference|$get_lvs_write_net_cross_reference|$set_mark|$set_mask_auto_view|$set_mask_default_database_name|$get_mask_default_database_name|$set_mask_thresholds|$get_mask_thresholds|$set_max_auto_display|$get_max_auto_display|$set_modify_distance|$get_modify_distance|$set_mos_cell_type|$get_mos_cell_type|$set_mos_share|$get_mos_share|$set_net_priority|$set_new_window_cull|$get_new_window_cull|$set_new_window_grid|$get_new_window_grid|$set_next_direct_net|$set_next_mask_device|$set_next_mask_discrepancy|$set_next_mask_net|$set_packed_vias|$set_padding_grid|$set_path_display_style|$get_path_display_style|$set_peek_on_view|$get_peek_on_view|$set_peek_protect|$set_pex_backannotation_distributed|$get_pex_backannotation_distributed|$set_pex_backannotation_lumped|$get_pex_backannotation_lumped|$set_pex_capacitance_scale|$get_pex_capacitance_scale|$set_pex_coupled_distributed|$get_pex_coupled_distributed|$set_pex_delay|$get_pex_delay|$set_pex_exclude_distributed|$get_pex_exclude_distributed|$set_pex_include_distributed|$get_pex_include_distributed|$set_pex_netlist_distributed|$get_pex_netlist_distributed|$set_pex_netlist_lumped|$get_pex_netlist_lumped|$set_pex_netlist_simple|$get_pex_netlist_simple|$set_pex_options_lumped|$get_pex_options_lumped|$set_pex_report_distributed|$get_pex_report_distributed|$set_pex_report_lumped|$get_pex_report_lumped|$set_pin_shape_editing|$set_placement_select_mode|$get_placement_select_mode|$set_point_select_mode|$get_point_select_mode|$set_point_select_reset_basepoint|$get_point_select_reset_basepoint|$set_port_pin_name_display|$get_port_pin_name_display|$set_preferred_overflow_layers|$get_preferred_overflow_layers|$set_previous_direct_net|$set_previous_mask_device|$set_previous_mask_discrepancy|$set_previous_mask_net|$set_print_appearance|$set_print_array_style|$get_print_array_style|$set_print_cull|$get_print_cull|$set_print_grid|$get_print_grid|$set_print_layers|$get_print_layers|$set_print_levels|$get_print_levels|$set_print_peeked_only|$get_print_peeked_only|$set_process_override|$set_push_count_limit|$set_query_on_merge|$get_query_on_merge|$set_query_on_placement|$get_query_on_placement|$set_redraw_controls|$get_redraw_controls|$set_redraw_level|$get_redraw_level|$set_redraw_precision|$get_redraw_precision|$set_redraw_queue_control|$get_redraw_queue_control|$set_report_target|$get_report_target|$set_restrict_visible|$get_restrict_visible|$set_resync_on_peek|$get_resync_on_peek|$set_route_center_wires|$get_route_center_wires|$set_route_hierarchy_mode|$set_route_net_order|$get_route_net_order|$set_route_objects|$get_route_objects|$set_route_one_pass|$get_route_one_pass|$set_route_overflow_order|$get_route_overflow_order|$set_route_pack_wires|$get_route_pack_wires|$set_route_protection|$set_route_same_net_checking|$get_route_same_net_checking|$set_route_stub_direction|$get_route_stub_direction|$set_route_trim_nets|$get_route_trim_nets|$set_route_via_rotation|$get_route_via_rotation|$set_router_channel_size_variation|$get_router_channel_size_variation|$set_router_cleanup|$get_router_cleanup|$set_router_compound_path|$get_router_compound_path|$set_router_conn_order|$get_router_conn_order|$set_router_do_net_rules_check|$get_router_do_net_rules_check|$set_router_feed_bias|$get_router_feed_bias|$set_router_h_grid_size|$get_router_h_grid_size|$set_router_improve_global_val|$get_router_improve_global_val|$set_router_initial_global_val|$get_router_initial_global_val|$set_router_max_bends|$get_router_max_bends|$set_router_max_iters|$get_router_max_iters|$set_router_max_vias|$get_router_max_vias|$set_router_minimized_layers|$get_router_minimized_layers|$set_router_mode_type|$get_router_mode_type|$set_router_num_extra_tracks|$get_router_num_extra_tracks|$set_router_oper_mode_type|$get_router_oper_mode_type|$set_router_primary_layer_used|$get_router_primary_layer_used|$set_router_probe_layers|$get_router_probe_layers|$set_router_restricted_layers|$get_router_restricted_layers|$set_router_step_size|$get_router_step_size|$set_router_use_gridded_mode|$get_router_use_gridded_mode|$set_router_v_grid_size|$get_router_v_grid_size|$set_router_view_probes|$get_router_view_probes|$set_router_wrong_direction|$get_router_wrong_direction|$set_ruler_angle_mode|$get_ruler_angle_mode|$set_ruler_select_state|$get_ruler_select_state|$set_ruler_text_height|$get_ruler_text_height|$set_sd_hv_contact|$set_sdl_filter|$get_sdl_filter|$set_sdl_preserve_orientation|$get_sdl_preserve_orientation|$set_sdl_quiet|$get_sdl_quiet|$set_search_path|$get_search_path|$set_select_via_pin|$get_select_via_pin|$set_selectable_area|$get_selectable_area|$set_selectable_layers|$set_selectable_types|$get_selectable_types|$set_site_type|$set_snap_basepoint_to_grid|$get_snap_basepoint_to_grid|$set_target_mode|$get_target_mode|$set_text_cull_basis|$get_text_cull_basis|$set_text_display|$get_text_display|$set_text_origin_display|$get_text_origin_display|$set_timer|$set_toolbar_alignment|$get_toolbar_alignment|$set_toolbar_keep_items_visible|$get_toolbar_keep_items_visible|$set_undo_level|$get_undo_level|$set_undo_object_limit|$get_undo_object_limit|$set_unselect_empty|$get_unselect_empty|$set_update_connected|$get_update_connected|$set_verilog_array_delimiters|$get_verilog_array_delimiters|$set_verilog_supply0|$get_verilog_supply0|$set_verilog_supply1|$get_verilog_supply1|$set_view_controls|$get_view_controls|$set_visible_layers|$set_working_directory|$get_working_directory|$set_xml_group_protection|$get_xml_group_protection|$set_xml_logfile|$get_xml_logfile|$set_xml_other_protection|$get_xml_other_protection|$set_xml_read_cell_path_style|$get_xml_read_cell_path_style|$set_xml_replace|$get_xml_replace|$set_xml_style|$get_xml_style|$set_xml_write_cell_path_style|$get_xml_write_cell_path_style|$setup_auto_checkpoint|$setup_ic|$setup_ic_dynamics|$setup_new_windows|$setup_print|$setup_redraw_controls|$setup_reports|$setup_rulers|$get_active_ruler_bgd_color|$get_active_ruler_color|$get_active_ruler_font|$setup_sdl|$setup_select_filter|$setup_session|$setup_status_line|$show_all_mask_devices|$show_all_mask_discrepancies|$show_all_mask_nets|$show_aspect|$show_contact_gaps|$show_context|$show_current_mask_device|$show_current_mask_discrepancy|$show_current_mask_net|$show_drc_all|$show_drc_area|$show_drc_check|$show_drc_current|$show_drc_scan|$show_group|$show_guidelines|$show_layer_palette|$show_mask_device_id|$show_mask_device_name|$show_mask_device_point|$show_mask_discrepancy|$show_mask_net_id|$show_mask_net_name|$show_mask_net_point|$show_panel|$show_status_line|$show_system_toolbar|$show_toolbar|$show_tooltips|$show_unplaced_instances|$slice|$slice_array|$slice_with_polygon|$slide_route|$snap_to_grid|$snap_to_row|$startup|$stretch|$stretch_relative|$swap_logically_equivalent_nets|$toolbar_context_glyph_item|$toolbar_glyph_item|$tooltips_visible|$trace_property_numeric|$trace_property_string|$trim_invalid_nets|$trim_nets|$trim_nets_options|$undefine_layer_alias|$undefine_layer_name|$undefine_layer_set|$undefine_must_connect|$undefine_net_pairs|$undelete_drc|$undo|$unfreeze_window|$ungroup|$unhighlight_all|$unhighlight_group|$unhighlight_hierarchical_net|$unlink_floorplan_shape|$unload_closed_cells|$unload_mask_results|$unload_viewpoint|$unmake_port|$unmark_all_ignored|$unmark_instances_as_ignored|$unpeek|$unpeek_area|$unplace|$unprotect_all|$unprotect_group|$unprotect_nets|$unreserve_cell|$unreserve_cell_by_name|$unreserve_library|$unreserve_process|$unselect_all|$unselect_all_edges|$unselect_area|$unselect_area_polygon|$unselect_by_name|$unselect_by_property|$unselect_drc|$unselect_edge|$unselect_group|$unselect_range|$unset_cell_process|$unset_logic_source|$unset_process_override|$unshow_all_mask_devices|$unshow_all_mask_discrepancies|$unshow_all_mask_nets|$unshow_all_mask_results|$unshow_current_mask_device|$unshow_current_mask_discrepancy|$unshow_current_mask_net|$unshow_drc|$unshow_guidelines|$untrace_all_properties|$update_cell|$update_cell_by_name|$update_gadget|$update_group_window|$update_hier_window|$update_layout_view|$update_layout_config_view|$update_library|$view_all|$view_all_mask_devices|$view_all_mask_discrepancies|$view_all_mask_nets|$view_area|$view_centered|$view_context|$view_current_mask_device|$view_current_mask_discrepancy|$view_current_mask_net|$view_drc|$view_highlighted|$view_next|$view_panel|$view_previous|$view_selected|$write_calibre|$write_def|$write_design_lef|$write_direct_cnet|$write_direct_netlist|$write_gdsii|$write_hierarchical_netlist|$write_lef|$write_mask_cnet|$write_mask_netlist|$write_source_cnet|$write_xml|$zoom_in|$zoom_out|$zoom_to_grid)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#007720')) continue;
            if((m = /^(?:$$add_arc|$add_border|$add_bus|$add_circle|$add_dot|$add_fb_def|$add_fb_inst|$add_fb_pins|$add_frame|$add_ic_viewpoint_type|$add_instance|$add_line|$add_net|$add_panel|$add_parameters|$add_pin|$add_polygon|$add_polyline|$add_property|$add_property_to_handle|$add_rectangle|$add_selected_instance|$add_settings_block|$add_sheet_border|$add_text|$add_wire|$align|$allow_resizable_instances|$apply_edits|$auto_sequence_text|$begin_edit_symbol|$change_color|$change_compiled_pin_name|$change_group_visibility|$change_instance_resize_factor|$change_line_style|$change_line_width|$change_net_style|$change_net_width|$change_polygon_fill|$change_property_color|$change_property_font|$change_property_height|$change_property_justification|$change_property_name|$change_property_offset|$change_property_orientation|$change_property_stability_switch|$change_property_type|$change_property_value|$change_property_visibility|$change_property_visibility_switch|$change_text_font|$change_text_height|$change_text_justification|$change_text_value|$change_variant_display|$$check|$check_and_save|$clear_unattached_annotations|$close_design_configuration|$close_selection|$close_window|$comp_name|$connect|$connect_area|$construct_frame|$convert_fb_inst_to_def|$convert_to_comment|$convert_to_new_technology|$copy|$copy_edit_hotkey_settings|$copy_multiple|$copy_to_array|$create_design_configuration|$create_design_sheet|$create_entity|$create_fb_inst_from_def|$create_implicit_pins|$create_pin_list|$create_sheet|$create_symbol|$create_variant_viewpoint|$da_ic_crossprobe|$da_ic_crossprobe_diff|$define_hotkey|$delete|$delete_ba_property|$delete_interfaces|$delete_multiple_ba_properties|$delete_panel|$delete_parameter|$delete_property|$delete_property_owner|$delete_sheet|$delete_template_name|$direct_to_active_window|$disconnect|$disconnect_area|$disconnect_ba|$display_next_sheet|$display_prev_sheet|$display_spec_sheet|$does_selection_exist|$$dump_sim_values|$end_edit_symbol|$$exit_sim_mode|$expand_template_name|$export_spice|$export_verilog|$export_vhdl|$filter_property_check|$flip|$freeze_window|$generate_symbol|$get_active_symbol|$get_active_symbol_history|$get_apply_edits_needed|$get_attached_objects|$get_attributes|$get_auto_update_inst_handles|$get_basepoint|$get_body_text_restriction|$get_bundle_members|$get_check_schematic_status|$get_check_status|$get_comment_graphics_attributes|$get_comment_handles|$get_comment_text_attributes|$get_comment_text_restriction|$get_comment_visibility|$get_default_interface_name|$get_design_sheets|$get_diagram_location|$get_edit_mode|$get_evaluations|$get_fb_line_style_by_handle|$get_frame_attributes|$get_frame_handles|$get_grid|$get_hotkey_settings|$get_in_design_context|$get_instance_attributes|$get_instance_handles|$get_instance_models|$get_instance_pathname|$get_instance_resize_factor|$get_item_type|$get_model_path|$get_net_attributes|$get_net_handles|$get_next_active_symbol|$get_object_property_attributes|$get_objects|$get_objects_in_area|$get_origin|$get_owned_property_names|$get_parameter|$get_pathname|$get_pin_attributes|$get_pin_handles|$get_pin_names|$get_prop_text_restriction|$get_property|$get_property_attributes|$get_property_handles|$get_property_names|$get_property_owners|$get_schematic_sheets|$get_search_path|$get_select_count|$get_select_count_type|$get_select_design_paths|$get_select_extent|$get_select_handles|$get_select_handles_type|$get_select_identical|$get_select_text_exists|$get_select_text_handle|$get_select_text_name|$get_select_text_origin|$get_select_text_value|$get_sheet_design_pathname|$get_sheet_extent|$get_sheetname_viewed|$$get_sim_value|$$get_sim_version|$get_simulation_mode|$get_source_edit_allowed|$get_symbol_name|$get_text_information|$get_type_present|$get_vertex_attributes|$get_vertex_handles|$get_view_area|$get_viewpoint|$get_window_names|$get_window_sheet_list|$group|$hide_active_symbol_window|$hide_annotations|$hide_comment|$hide_context_window|$hide_panel_border|$hide_status_line|$hide_system_toolbar|$hide_toolbar|$highlight_by_handle|$highlight_by_name|$highlight_property_owner|$$hotplot_submit|$import_verilog|$insert_template|$is_active_symbol_window_visible|$is_context_window_visible|$is_handle_valid|$is_selection_open|$is_status_line_visible|$is_system_toolbar_visible|$is_toolbar_visible|$load_hotkey_settings|$make_fb|$make_polygon|$make_polyline|$make_symbol|$mark_property_attributes|$mark_property_value|$measure_distance|$merge_annotations|$modify_frame|$move|$move_cursor_incrementally|$$move_settings_block|$name_instances|$name_instances_auto|$open_design_configuration|$open_design_sheet|$open_down|$open_schematic|$open_sheet|$open_source_code|$open_symbol|$open_top|$open_up|$pivot|$place_active_symbol|$pop_to_front|$print_all_schematics|$print_design_sheets|$protect|$protect_area|$push_to_back|$recalculate_properties|$reconnect_annotations|$redo|$remove_comment_status|$reopen_selection|$replace|$replace_with_alternate_symbol|$report_broken_annotations|$$report_check|$report_default_property_settings|$report_groups|$report_hotkey_settings|$report_interfaces|$report_interfaces_selected|$report_object|$$report_object_name|$report_panels|$report_parameter|$report_unattached_annotations|$reselect|$reset_instance_colors|$resize_fb|$revalidate_models|$rotate|$route|$save_setup|$save_sheet|$save_sheet_as|$save_symbol|$save_symbol_as|$save_variant_viewpoint|$scale|$scroll_down_by_unit|$scroll_down_by_window|$scroll_hz|$scroll_left_by_unit|$scroll_left_by_window|$scroll_right_by_unit|$scroll_right_by_window|$scroll_up_by_unit|$scroll_up_by_window|$scroll_vt|$select_all|$select_area|$select_branches|$select_by_design_path|$select_by_handle|$select_by_name|$select_by_property|$select_by_property_type|$select_fb|$select_group|$select_instances|$select_nets|$select_pins|$select_property_owner|$select_template_name|$select_text|$select_vertices|$sequence_text|$set_active_symbol|$set_active_symbol_history|$set_basepoint|$set_color|$set_color_config|$set_compiler_options|$set_default_parts_menu|$set_edit_mode|$set_evaluations|$set_grid|$set_hotkey_mode|$set_next_active_symbol|$set_origin|$set_out_of_view_warn|$set_parameter|$set_previous_active_symbol|$set_property_owner|$set_property_type|$set_search_path|$set_sel_name_display|$$set_sim_value|$set_simulation_mode|$set_template_directory|$set_toolbar_alignment|$set_userrule_error|$set_userrule_warning|$set_variant_properties|$set_viewpoint|$$settings_block_visible|$setup_annotated_property_text|$setup_check_schematic|$setup_check_schematic_sheet|$$setup_check_sheet|$setup_check_symbol|$setup_color|$setup_comment|$setup_default_viewpoint|$setup_display|$setup_function_block|$setup_grid|$setup_hspice_alter|$setup_net|$setup_object_template|$setup_page|$setup_property_display|$setup_property_text|$setup_report|$setup_ripper|$setup_selection|$setup_select_filter|$setup_sim_config|$setup_sim_model_editor|$setup_symbol_body|$setup_text_restriction|$setup_unselect_filter|$show_active_symbol_window|$show_annotations|$show_comment|$show_context_window|$show_panel_border|$show_registration|$show_status_line|$show_system_toolbar|$show_toolbar|$sim_add_dspf|$sim_add_sdf|$sim_choose_library|$sim_copy_configuration_as|$sim_delete_converter|$sim_edit_commands|$sim_edit_measurements|$sim_edit_sdf|$sim_export_spice|$sim_get_adms_ini_file|$sim_hide_dcop|$sim_insert_converter_default|$sim_insert_converter_inst|$sim_insert_converter_net|$sim_insert_converter_pin|$sim_invoke|$sim_invoke_mr|$sim_invoke_ms|$$sim_merge_annotations|$sim_open_language|$sim_open_lang_model|$sim_process_extracted_netlist|$sim_restore_setup_from|$sim_run|$sim_save_selected|$sim_save_setup_as|$sim_set_additional_commands|$sim_set_include_paths|$sim_set_initial_condition|$sim_set_temperature|$sim_setup_analysis|$sim_setup_analysis_ac|$sim_setup_analysis_dc|$sim_setup_analysis_dcop|$sim_setup_analysis_mc|$sim_setup_analysis_mod_steadystate|$sim_setup_analysis_noise|$sim_setup_analysis_noisetran|$sim_setup_analysis_steadystate|$sim_setup_analysis_steadystateac|$sim_setup_analysis_steadystatenoise|$sim_setup_analysis_steadystateoscil|$sim_setup_analysis_tran|$sim_setup_netlister|$sim_setup_sim_environ|$$sim_setup_simulator_viewer|$$sim_setup_simulator_viewer_advance|$sim_simulate|$sim_view_measurements|$sim_view_output_file|$sim_write_commands|$sim_write_setup_file|$slice|$snap_to_grid|$sort_handles|$sort_handles_by_property|$stretch|$string_to_literal|$symb_name|$undo|$unfreeze_window|$ungroup|$unhighlight_by_handle|$unhighlight_by_name|$unhighlight_property_owner|$unmake_fb|$unprotect|$unprotect_area|$unselect_all|$unselect_area|$unselect_by_design_path|$unselect_by_handle|$unselect_by_property|$unselect_by_property_type|$unselect_fb|$unselect_property_owner|$unselect_vertices|$update|$update_all|$update_all_schematics|$update_border|$update_from_interface|$$update_settings_blocks|$update_title_block|$view_all|$view_area|$view_centered|$view_panel|$view_selected|$vpt_needs_save|$was_saved|$zoom_in|$zoom_out|$get_auto_name_net|$get_auto_place_instance_name|$get_check_busshorts|$get_check_functionblocks|$get_check_schematicbusshorts|$get_check_schematicnetio|$get_fb_def_color|$get_fb_def_line_style|$get_fb_inst_color|$get_fb_inst_line_style|$get_fb_int_change_popup|$get_fb_passthru|$get_fb_popupwin|$set_annotation_color|$set_annotation_visibility|$set_auto_name_net|$set_auto_place_instance_name|$set_auto_update_mode|$set_autoripper|$set_autoroute|$set_autoselect|$set_bus_width|$set_check_annotations|$set_check_busshorts|$set_check_closedots|$set_check_dangle|$set_check_expression|$set_check_filemode|$set_check_filename|$set_check_frame|$set_check_functionblocks|$set_check_initprops|$set_check_instance|$set_check_net|$set_check_notdots|$set_check_overlap|$set_check_owner|$set_check_parameter|$set_check_pins|$set_check_schematicbusshorts|$set_check_schematicinstance|$set_check_schematicinterface|$set_check_schematicnet|$set_check_schematicnetio|$set_check_schematicspecial|$set_check_schematicuserrule|$set_check_special|$set_check_symbolbody|$set_check_symbolinterface|$set_check_symbolpin|$set_check_symbolspecial|$set_check_symboluserrule|$set_check_transcript|$set_check_userrule|$set_check_window|$set_close_dot|$set_closeness_criteria|$set_dot_size|$set_dot_style|$set_dynamic_cursor|$set_dynamic_rounding_precision|$set_environment_dofile_pathname|$set_fb_def_color|$set_fb_def_line_style|$set_fb_inst_color|$set_fb_inst_line_style|$set_fb_int_change_popup|$set_fb_passthru|$set_fb_popupwin|$set_hidden_symbol_prop_display|$set_implicit_ripper|$set_line_style|$set_line_width|$set_modify_multiple_prop_filter|$set_net_style|$set_net_width|$set_new_annotation_visibility|$set_orthogonal|$set_orthogonal_angle|$set_pin_spacing|$set_polygon_fill|$set_property_font|$set_property_height|$set_property_hjustification|$set_property_orientation|$set_property_stability_switch|$set_property_transparency|$set_property_visibility|$set_property_visibility_switch|$set_property_vjustification|$set_report_filemode|$set_report_filename|$set_report_transcript|$set_report_window|$set_ripper_dot|$set_ripper_mode|$set_ripper_query|$set_ripper_symbol_pathname|$set_schem_check_mode|$set_schematicuserrules_file|$set_segment_select_mode|$set_select_aperture|$set_select_comment|$set_select_exterior|$set_select_frame|$set_select_instance|$set_select_net|$set_select_pin|$set_select_property|$set_select_segment|$set_select_symbolbody|$set_select_symbolpin|$set_select_text|$set_select_vertex|$set_selection_color|$set_selection_model|$set_snap|$set_symboluserrules_file|$set_text_font|$set_text_height|$set_text_hjustification|$set_text_orientation|$set_text_transparency|$set_text_vjustification|$set_undo_level|$set_unselect_comment|$set_unselect_exterior|$set_unselect_frame|$set_unselect_instance|$set_unselect_net|$set_unselect_pin|$set_unselect_property|$set_unselect_segment|$set_unselect_symbolbody|$set_unselect_symbolpin|$set_unselect_text|$set_unselect_vertex|$set_userrules_file|$set_user_units)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0A7701')) continue;
            if((m = /^(?:$add_back_annotation|$add_multiple_properties|$add_parameter|$add_primitive|$add_property|$add_substitute|$add_visible_property|$change_model|$change_property|$check_design|$clear_global_parameter|$close_design_viewpoint|$connect_back_annotation|$delete_invalid_entries|$delete_parameter|$delete_primitive|$delete_property|$delete_substitute|$delete_visible_property|$disconnect_back_annotation|$erc_check|$export_back_annotation|$export_design_configuration|$filter_property_check|$get_viewpoint_name|$import_back_annotation|$is_ba_readonly|$is_function_defined|$latch_using_label|$latch_version|$maintain_back_annotation_window|$open_back_annotation|$open_design_configuration|$open_design_viewpoint|$preset_global_parameter|$reload_model|$report_select_counts|$report_viewpoint_references|$save_design_viewpoint|$select_back_annotation|$select_design_configuration|$select_parameter|$select_primitive|$select_substitute|$select_visible_property|$unlatch_version|$unselect_back_annotation|$unselect_design_configuration|$unselect_parameter|$unselect_primitive|$unselect_substitute|$unselect_visible_property|$update_latched_version)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0A775C')) continue;
            if((m = /^(?:$get_current_obj_hier_path|$get_current_obj_inst_list|$idw_dh_setup_display|$idw_report_hier|$idw_open_hierarchy_window|$inst_area_extend_selection|$inst_area_select_all_items|$inst_area_select_item|$inst_area_show_instances|$inst_area_unselect_all_items|$make_obj_current|$open_new_comp_hierarchy|$open_new_hierarchy|$select_obj|$show_instance|$show_n_levels|$set_font|$setup_comp_hierarchy_display|$setup_hierarchy_selection|$write_default_startup_file|$add_components|$add_labels_to_models|$collapse_object|$delete_labels_from_models|$delete_part_interfaces|$expand_object|$forget_components_edits|$hide_body_props|$hide_labels|$hide_model|$hide_pin_properties|$hide_pins|$register_models|$remove_components|$rename_part_interface|$report_body_prop_info|$report_component_info|$report_model_entry_info|$report_models_for_each_label|$report_model_info|$report_models_with_all_labels|$report_pin_info|$save_components_edits|$select_model_object|$select_object|$set_bgd_color|$set_bgd_color_title_items|$set_bgd_color_titles|$set_constraints|$set_default_part_interface|$set_fgd_color|$set_fgd_color_title_items|$set_fgd_color_titles|$set_font|$set_part_interface_font|$show_body_props|$show_labels|$show_model|$show_pins|$show_pin_properties|$unselect_model_object|$unselect_object|$validate_models)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0A7700')) continue;
            if((m = /^(?:$$add_configuration_entry|$add_configuration_entry|$$add_container|$add_container|$$add_directory|$add_directory|$add_link|$add_object_property|$$add_reference|$add_reference|$add_reference_property|$add_toolbox|$$add_type|$add_versions|$browse_for_object|$$build_configuration|$build_configuration|$$change_configuration_references|$change_configuration_references|$$change_design_object_references|$change_design_object_references|$change_link_text|$change_location_map_entry|$$change_object_name|$change_object_name|$change_object_property|$$change_object_references|$change_object_references|$change_password|$change_protection|$change_reference_property|$change_reference_state|$change_version_depth|$check_references|$check_registries|$$clear_entry_filter|$$clear_global_status|$$clear_monitor|$$close_configuration|$close_hierarchy|$$close_versioned_object|$close_window|$$convert_configuration_references|$convert_configuration_references|$$convert_object_references|$convert_object_references|$$copy_configuration|$copy_configuration|$$copy_design_object|$copy_design_object|$$copy_object|$copy_object|$copy_version|$$create_configuration|$create_dm_category|$create_dm_cell|$create_dm_ext_lib|$create_dm_library|$create_dm_project|$create_dm_tech_category|$create_dm_tech_lib|$create_tech_config_object|$$create_versioned_object|$$delete_configuration|$delete_configuration|$delete_design_object|$delete_excess_versions|$$delete_object|$delete_object|$$delete_object_property|$delete_object_property|$$delete_reference|$delete_reference|$$delete_reference_handle|$$delete_reference_property|$delete_reference_property|$$delete_reference_property_handle|$$delete_version|$delete_version|$$delete_version_property|$descend_hierarchy_one_level|$descend_hierarchy_specify_level|$$duplicate_object|$edit_file|$empty_trash|$explore_contents|$explore_parent|$explore_reference_parent|$explore_references|$export_configuration_entries|$export_library|$export_location_map|$find_external_deps|$find_references|$$fix_relative_path|$$freeze_configuration|$freeze_configuration|$$freeze_version|$freeze_version|$get_area_selected_objects|$$get_children|$$get_configuration_entries|$$get_configuration_path|$$get_container_contents|$$get_date_last_modified|$get_default_tool|$$get_entry_version|$$get_fileset_members|$$get_hard_name|$$get_location_map|$$get_monitor_error_count|$$get_monitor_flag|$$get_monitor_verbosity|$$get_monitor_warning_count|$get_navigator_directory|$get_navigator_directory_hard|$get_next_tool_env|$$get_object_current_version|$$get_object_parent_path|$$get_object_path_filter|$get_object_pathname|$$get_object_properties|$$get_object_property_filter|$$get_object_property_value|$$get_object_protection|$$get_object_references|$$get_object_type|$get_object_type|$$get_object_type_filter|$get_object_version|$$get_object_versions|$$get_parent_entry|$$get_primaries|$$get_reference_properties|$$get_reference_properties_handle|$$get_reference_property_filter|$$get_reference_traversal|$$get_secondaries|$$get_soft_name|$$get_status_code|$$get_status_code_stack|$$get_status_messages|$get_subinvoke_mode|$$get_target_path|$get_technology|$get_toolbox_search_path|$get_tool_pathname|$get_tool_script|$get_tool_type|$$get_type_properties|$$get_type_property_value|$$get_version_depth|$$get_version_properties|$$get_working_directory|$goto_directory|$$handle_map_error|$$has_object_property|$$has_reference_property|$$has_reference_property_handle|$hide_secondary_entries|$hide_monitor|$import_classic_data|$import_custom_view|$import_design_kit|$import_ext_lib|$import_icstudio_library|$import_icstudio_project|$include_external_library|$invoke_bgd_tool|$invoke_tool|$$is_build_consistent|$$is_build_valid|$$is_configuration_edited|$$is_configuration_frozen|$$is_configuration_locked|$$is_container|$$is_directory|$$is_entry_container|$$is_entry_fixed|$$is_entry_primary|$$is_entry_retargetable|$$is_object_released|$$is_object_versioned|$$is_read_protected|$$is_relative_path|$$is_type_versioned|$$is_writable|$$is_write_protected|$list_references|$load_registry|$$lock_configuration|$lock_configuration|$$lock_object|$login_admin|$logged_in|$logout_admin|$maintain_hierarchy|$$monitor_global_status|$$move_design_object|$move_design_object|$$move_object|$move_object|$$object_complete|$$object_exists|$$open_configuration|$open_configuration_window|$$open_hierarchy|$open_navigator|$open_object|$open_read_only_editor|$open_session_monitor|$$open_tool|$open_tool|$open_tools_window|$open_trash_window|$open_types_window|$$open_versioned_object|$$prune_design_hierarchy|$$read_map|$read_map|$refresh_all|$$release_configuration|$release_configuration|$$release_object|$release_object|$$remove_configuration_entry|$remove_configuration_entry|$remove_external_library|$remove_toolbox|$report_configuration_info|$$report_configuration_references|$report_configuration_references|$report_entry_info|$$report_entry_verification|$report_entry_verification|$$report_global_status|$report_object_info|$report_reference_info|$report_tool_info|$report_type_info|$report_version_info|$$resolve_path|$$revert_version|$revert_version|$$salvage_object|$salvage_object|$$save_configuration|$save_configuration|$$save_configuration_as|$save_configuration_as|$$save_object|$save_toolbox_search_path|$search|$search_again|$select_all|$select_by_name|$select_by_library|$select_by_type|$select_config_entry|$select_object|$select_reference|$select_tool|$select_toolbox|$select_trash_object|$select_version|$set_build_rules|$$set_location_map_entry|$$set_monitor_flag|$$set_monitor_verbosity|$set_next_tool_env|$$set_object_path_filter|$$set_object_property|$$set_object_property_filter|$$set_object_type_filter|$set_project_refresh_heartbeat|$$set_protection|$$set_protection_numeric|$$set_reference_property|$$set_reference_property_filter|$$set_reference_property_handle|$$set_reference_traversal|$set_subinvoke_mode|$$set_target_path|$set_target_path|$set_technology|$set_toolbox_search_path|$$set_version_depth|$$set_version_property|$$set_working_directory|$set_working_directory|$setup_filter_active|$setup_filter_all|$setup_default_editor|$setup_iconic_window_layout|$setup_invoke_tool|$$setup_monitor|$setup_monitor|$setup_session_defaults|$setup_startup_windows|$show_all_files|$show_compiled_libs|$show_component_hierarchy|$show_custom_views|$show_directories|$show_ext_libs|$show_language_views|$show_layout_views|$$show_location_map|$show_location_map|$show_logic_views|$show_references|$show_monitor|$show_tech_libs|$show_versions|$trash_object|$$unfreeze_configuration|$unfreeze_configuration|$$unfreeze_version|$unfreeze_version|$$unlock_configuration|$unlock_configuration|$$unlock_object|$unselect_all|$unselect_by_name|$unselect_by_type|$unselect_config_entry|$unselect_object|$unselect_reference|$unselect_tool|$unselect_toolbox|$unselect_trash_object|$unselect_version|$unset_next_tool_env|$untrash_object|$$update_type|$update_window|$validate_technology|$view_by_icon|$view_by_name|$view_containment_hierarchy|$view_primary_hierarchy|$view_secondary_entries|$view_toolboxes|$view_tools|$write_default_startup_file|$$writeln_monitor)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0A7700')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.ample_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.ample_commentar1())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.ample_commentar2())return this.pop(), m-1;continue;}
            if((m = /^[:!%&()+,\-/.*<=>?[\]|~\^;]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    ample_string: function ample_string(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    ample_regionMarker: function ample_regionMarker(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsRegionMarker');
        }
        this.pop();
    },
    ample_commentar1: function ample_commentar1(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    ample_commentar2: function ample_commentar2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return this.pop();
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    ample_afterHash: function ample_afterHash(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^#\s*if(?:def|ndef)?(?=\s+\S)/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ample_preprocessor())return this.pop(), m-1;continue;}
            if((m = /^#\s*endif/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ample_preprocessor())return this.pop(), m-1;continue;}
            if((m = /^#\s*define.*((?=\\))/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ample_define())return this.pop(), m-1;continue;}
            if((m = /^#\s*(?:el(?:se|if)|include(?:_next)?|define|undef|line|error|warning|pragma)/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ample_preprocessor())return this.pop(), m-1;continue;}
            if((m = /^#\s+[0-9]+/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ample_preprocessor())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    ample_preprocessor: function ample_preprocessor(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^".*?"/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^<.*?>/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\/\/(!|(\/(?=[^/]|(?=$|\n))))<?/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) {if(m = this.doxygen_lineComment())return this.pop(), m-1;continue;}
            if((m = /^\/\*(\*[^*/]|!|[*!]<|\*(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) {if(m = this.doxygen_blockComment())return this.pop(), m-1;continue;}
            if((m = /^\/\/\s*@\{\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\/\s*@\}\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*\s*@\{\s*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*\s*@\}\s*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.ample_commentarPreprocessor())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    ample_define: function ample_define(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    ample_commentarPreprocessor: function ample_commentarPreprocessor(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    ample_outscoped: function ample_outscoped(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.ample_string())return this.pop(), m-1;continue;}
            if((m = /^\/\/(!|(\/(?=[^/]|(?=$|\n))))<?/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) {if(m = this.doxygen_lineComment())return this.pop(), m-1;continue;}
            if((m = /^\/\*(\*[^*/]|!|[*!]<|\*(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) {if(m = this.doxygen_blockComment())return this.pop(), m-1;continue;}
            if((m = /^\/\/\s*@\{\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\/\s*@\}\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*\s*@\{\s*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*\s*@\}\s*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.ample_commentar1())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.ample_commentar2())return this.pop(), m-1;continue;}
            if((m = /^#\s*if/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.ample_outscopedIntern())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    ample_outscopedIntern: function ample_outscopedIntern(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.ample_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.ample_commentar1())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.ample_commentar2())return this.pop(), m-1;continue;}
            if((m = /^#\s*if/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.ample_outscopedIntern())return this.pop(), m-1;continue;}
            if((m = /^#\s*endif/.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    alert_normalText: function alert_normalText(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    doxygen_normal: function doxygen_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\/\/(!|(\/(?=[^/]|(?=$|\n))))<?/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) {if(m = this.doxygen_lineComment())return this.pop(), m-1;continue;}
            if((m = /^\/\*(\*[^*/]|!|[*!]<|\*(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) {if(m = this.doxygen_blockComment())return this.pop(), m-1;continue;}
            if((m = /^\/\/\s*@\{\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\/\s*@\}\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*\s*@\{\s*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*\s*@\}\s*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    doxygen_lineComment: function doxygen_lineComment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if((m = /^[@\\]code\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_code())return this.pop(), m-1;continue;}
            if((m = /^[@\\]verbatim\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_verbatim())return this.pop(), m-1;continue;}
            if((m = /^[@\\]f\[/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_formula())return this.pop(), m-1;continue;}
            if((m = /^[@\\]msc\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_msc())return this.pop(), m-1;continue;}
            if((m = /^[@\\]dot\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_dot())return this.pop(), m-1;continue;}
            if((m = /^(?:\\note|@note)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#81ca2d;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^(?:\\warning|@warning)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca9219;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^(?:\\attention|@attention)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#e85848;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^(?:\\todo|@todo)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^&[A-Za-z]+;/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#4086C0;fontStyle:italic;fontWeight:bold')) continue;
            if((m = /^(?:\\arg|@arg|\\author|@author|\\authors|@authors|\\brief|@brief|\\bug|@bug|\\callgraph|@callgraph|\\callergraph|@callergraph|\\date|@date|\\deprecated|@deprecated|\\details|@details|\\else|@else|\\endcond|@endcond|\\endhtmlonly|@endhtmlonly|\\endif|@endif|\\enditernal|@enditernal|\\endlatexonly|@endlatexonly|\\endlink|@endlink|\\endmanonly|@endmanonly|\\endrtfonly|@endrtfonly|\\endxmlonly|@endxmlonly|\\f\[|@f\[|\\f]|@f]|\\f$|@f$|\\hideinitializer|@hideinitializer|\\htmlonly|@htmlonly|\\internal|@internal|\\invariant|@invariant|\\latexonly|@latexonly|\\li|@li|\\manonly|@manonly|\\n|@n|\\nosubgrouping|@nosubgrouping|\\only|@only|\\post|@post|\\pre|@pre|\\private|@pivate|\\privatesection|@pivatesection|\\protected|@protected|\\protectedsection|@protectedsection|\\public|@public|\\publicsection|@publicsection|\\remarks|@remarks|\\return|@return|\\returns|@returns|\\result|@result|\\rtfonly|@rtfonly|\\sa|@sa|\\see|@see|\\short|@short|\\showinitializer|@showinitializer|\\since|@since|\\tableofcontents|@tableofcontents|\\test|@test|\\version|@version|\\xmlonly|@xmlonly|\\#|@#|\\$|@$|\\%|@%|\\&|@&|\\>|@>|\\<|@<|\\"|@"|\\::|@::|\\@|@@|\\\\|@\\|\\~|@~)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^(?:\\a|@a|\\anchor|@anchor|\\b|@b|\\c|@c|\\cond|@cond|\\copybrief|@copybrief|\\copydetails|@copydetails|\\copydoc|@copydoc|\\def|@def|\\dir|@dir|\\dontinclude|@dontinclude|\\e|@e|\\elseif|@elseif|\\em|@em|\\enum|@enum|\\example|@example|\\exception|@exception|\\exceptions|@exceptions|\\extends|@extends|\\file|@file|\\htmlinclude|@htmlinclude|\\if|@if|\\ifnot|@ifnot|\\implements|@implements|\\include|@include|\\includelineno|@includelineno|\\link|@link|\\memberof|@memberof|\\namespace|@namespace|\\p|@p|\\package|@package|\\property|@property|\\relatedalso|@relatedalso|\\relatesalso|@relatesalso|\\related|@related|\\relates|@relates|\\retval|@retval|\\throw|@throw|\\throws|@throws|\\verbinclude|@verbinclude|\\version|@version|\\xrefitem|@xrefitem)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_sL_TagWord())return this.pop(), m-1;continue;}
            if((m = /^(?:\\param|@param|\\tparam|@tparam)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_sL_TagParam())return this.pop(), m-1;continue;}
            if((m = /^(?:\\image|@image)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_sL_TagWordWord())return this.pop(), m-1;continue;}
            if((m = /^(?:\\addindex|@addindex|\\copyright|@copyright|\\fn|@fn|\\ingroup|@ingroup|\\line|@line|\\mainpage|@mainpage|\\name|@name|\\overload|@overload|\\par|@par|\\skip|@skip|\\skipline|@skipline|\\typedef|@typedef|\\until|@until|\\var|@var)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_sL_TagString())return this.pop(), m-1;continue;}
            if((m = /^(?:\\addtogroup|@addtogroup|\\category|@category|\\class|@class|\\dotfile|@dotfile|\\defgroup|@defgroup|\\interface|@interface|\\headerfile|@headerfile|\\mscfile|@mscfile|\\page|@page|\\paragraph|@paragraph|\\protocol|@prtocol|\\ref|@ref|\\section|@section|\\snippet|@snippet|\\struct|@struct|\\subpage|@subpage|\\subsection|@subsection|\\subsubsection|@subsubsection|\\union|@union|\\weakgroup|@weakgroup)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_sL_TagWordString())return this.pop(), m-1;continue;}
            if((m = /^[@\\][^@\\ \t]+/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#458C61;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.doxygen_sL_htmlcomment())return this.pop(), m-1;continue;}
            if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if((m = /^<\/?[a-zA-Z_:][a-zA-Z0-9._:-]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000000;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_sL_htmltag())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment;color:#0000ff;fontStyle:italic');
        }
        this.pop();
    },
    doxygen_blockComment: function doxygen_blockComment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment;color:#0000ff;fontStyle:italic')) return this.pop();
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '@' && this.str[1] == '{' && this.hl('@{', 'dsRegionMarker')) continue;
            if(this.str[0] == '@' && this.str[1] == '}' && this.hl('@}', 'dsRegionMarker')) continue;
            if((m = /^[@\\]code\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_code())return this.pop(), m-1;continue;}
            if((m = /^[@\\]verbatim\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_verbatim())return this.pop(), m-1;continue;}
            if((m = /^[@\\]f\[/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_formula())return this.pop(), m-1;continue;}
            if((m = /^[@\\]msc\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_msc())return this.pop(), m-1;continue;}
            if((m = /^[@\\]dot\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_dot())return this.pop(), m-1;continue;}
            if((m = /^(?:\\note|@note)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#81ca2d;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^(?:\\warning|@warning)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca9219;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^(?:\\attention|@attention)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#e85848;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^(?:\\todo|@todo)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^&[A-Za-z]+;/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#4086C0;fontStyle:italic;fontWeight:bold')) continue;
            if((m = /^(?:\\arg|@arg|\\author|@author|\\authors|@authors|\\brief|@brief|\\bug|@bug|\\callgraph|@callgraph|\\callergraph|@callergraph|\\date|@date|\\deprecated|@deprecated|\\details|@details|\\else|@else|\\endcond|@endcond|\\endhtmlonly|@endhtmlonly|\\endif|@endif|\\enditernal|@enditernal|\\endlatexonly|@endlatexonly|\\endlink|@endlink|\\endmanonly|@endmanonly|\\endrtfonly|@endrtfonly|\\endxmlonly|@endxmlonly|\\f\[|@f\[|\\f]|@f]|\\f$|@f$|\\hideinitializer|@hideinitializer|\\htmlonly|@htmlonly|\\internal|@internal|\\invariant|@invariant|\\latexonly|@latexonly|\\li|@li|\\manonly|@manonly|\\n|@n|\\nosubgrouping|@nosubgrouping|\\only|@only|\\post|@post|\\pre|@pre|\\private|@pivate|\\privatesection|@pivatesection|\\protected|@protected|\\protectedsection|@protectedsection|\\public|@public|\\publicsection|@publicsection|\\remarks|@remarks|\\return|@return|\\returns|@returns|\\result|@result|\\rtfonly|@rtfonly|\\sa|@sa|\\see|@see|\\short|@short|\\showinitializer|@showinitializer|\\since|@since|\\tableofcontents|@tableofcontents|\\test|@test|\\version|@version|\\xmlonly|@xmlonly|\\#|@#|\\$|@$|\\%|@%|\\&|@&|\\>|@>|\\<|@<|\\"|@"|\\::|@::|\\@|@@|\\\\|@\\|\\~|@~)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^(?:\\a|@a|\\anchor|@anchor|\\b|@b|\\c|@c|\\cond|@cond|\\copybrief|@copybrief|\\copydetails|@copydetails|\\copydoc|@copydoc|\\def|@def|\\dir|@dir|\\dontinclude|@dontinclude|\\e|@e|\\elseif|@elseif|\\em|@em|\\enum|@enum|\\example|@example|\\exception|@exception|\\exceptions|@exceptions|\\extends|@extends|\\file|@file|\\htmlinclude|@htmlinclude|\\if|@if|\\ifnot|@ifnot|\\implements|@implements|\\include|@include|\\includelineno|@includelineno|\\link|@link|\\memberof|@memberof|\\namespace|@namespace|\\p|@p|\\package|@package|\\property|@property|\\relatedalso|@relatedalso|\\relatesalso|@relatesalso|\\related|@related|\\relates|@relates|\\retval|@retval|\\throw|@throw|\\throws|@throws|\\verbinclude|@verbinclude|\\version|@version|\\xrefitem|@xrefitem)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_mL_TagWord())return this.pop(), m-1;continue;}
            if((m = /^(?:\\param|@param|\\tparam|@tparam)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_mL_TagParam())return this.pop(), m-1;continue;}
            if((m = /^(?:\\image|@image)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_mL_TagWordWord())return this.pop(), m-1;continue;}
            if((m = /^(?:\\addindex|@addindex|\\copyright|@copyright|\\fn|@fn|\\ingroup|@ingroup|\\line|@line|\\mainpage|@mainpage|\\name|@name|\\overload|@overload|\\par|@par|\\skip|@skip|\\skipline|@skipline|\\typedef|@typedef|\\until|@until|\\var|@var)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_mL_TagString())return this.pop(), m-1;continue;}
            if((m = /^(?:\\addtogroup|@addtogroup|\\category|@category|\\class|@class|\\dotfile|@dotfile|\\defgroup|@defgroup|\\interface|@interface|\\headerfile|@headerfile|\\mscfile|@mscfile|\\page|@page|\\paragraph|@paragraph|\\protocol|@prtocol|\\ref|@ref|\\section|@section|\\snippet|@snippet|\\struct|@struct|\\subpage|@subpage|\\subsection|@subsection|\\subsubsection|@subsubsection|\\union|@union|\\weakgroup|@weakgroup)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_mL_TagWordString())return this.pop(), m-1;continue;}
            if((m = /^[@\\][^@\\ \t]+/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#458C61;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if((m = /^\\(<|>)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) continue;
            if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if((m = /^<\/?[a-zA-Z_:][a-zA-Z0-9._:-]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000000;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_mL_htmltag())return this.pop(), m-1;continue;}
            if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.doxygen_mL_htmlcomment())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsComment;color:#0000ff;fontStyle:italic');
        }
        this.pop();
    },
    doxygen_mL_TagWord: function doxygen_mL_TagWord(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/') return this.pop();
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if(/^(?:\\a|@a|\\anchor|@anchor|\\b|@b|\\c|@c|\\cond|@cond|\\copybrief|@copybrief|\\copydetails|@copydetails|\\copydoc|@copydoc|\\def|@def|\\dir|@dir|\\dontinclude|@dontinclude|\\e|@e|\\elseif|@elseif|\\em|@em|\\enum|@enum|\\example|@example|\\exception|@exception|\\exceptions|@exceptions|\\extends|@extends|\\file|@file|\\htmlinclude|@htmlinclude|\\if|@if|\\ifnot|@ifnot|\\implements|@implements|\\include|@include|\\includelineno|@includelineno|\\link|@link|\\memberof|@memberof|\\namespace|@namespace|\\p|@p|\\package|@package|\\property|@property|\\relatedalso|@relatedalso|\\relatesalso|@relatesalso|\\related|@related|\\relates|@relates|\\retval|@retval|\\throw|@throw|\\throws|@throws|\\verbinclude|@verbinclude|\\version|@version|\\xrefitem|@xrefitem)\b/.exec(this.str)) return this.pop();
            if((m = /^\S(?=&wordsep;)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;fontStyle:normal;fontWeight:bold')) return this.pop();
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;fontStyle:normal;fontWeight:bold')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment;color:#0000ff;fontStyle:italic');
        }
        this.pop();
    },
    doxygen_mL_TagParam: function doxygen_mL_TagParam(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/') return this.pop();
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if((m = /^\[in]/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_mL_Tag2ndWord())return this.pop(), m-1;continue;}
            if((m = /^\[out]/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_mL_Tag2ndWord())return this.pop(), m-1;continue;}
            if((m = /^\[in,out]/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_mL_Tag2ndWord())return this.pop(), m-1;continue;}
            if((m = /^\S(?=&wordsep;)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;fontStyle:normal;fontWeight:bold')) return this.pop();
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;fontStyle:normal;fontWeight:bold')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment;color:#0000ff;fontStyle:italic');
        }
        this.pop();
    },
    doxygen_mL_TagWordWord: function doxygen_mL_TagWordWord(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/') return this.pop();
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if((m = /^\S(?=&wordsep;)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_mL_Tag2ndWord())return this.pop(), m-1;continue;}
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;fontStyle:normal;fontWeight:bold')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment;color:#0000ff;fontStyle:italic');
        }
        this.pop();
    },
    doxygen_mL_Tag2ndWord: function doxygen_mL_Tag2ndWord(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/') return this.pop(), 1;
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if((m = /^\S(?=&wordsep;)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;fontStyle:normal;fontWeight:bold')) return this.pop(), 1;
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;fontStyle:normal;fontWeight:bold')) continue;
            if(this.str[0] == '\n') return this.pop(), 1;
            this.hl(this.str[0], 'dsComment;color:#0000ff;fontStyle:italic');
        }
        this.pop();
    },
    doxygen_mL_TagString: function doxygen_mL_TagString(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if(this.str[0] == '*' && this.str[1] == '/') return this.pop();
            if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.doxygen_mL_htmlcomment())return this.pop(), m-1;continue;}
            if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if((m = /^<\/?[a-zA-Z_:][a-zA-Z0-9._:-]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000000;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_mL_htmltag())return this.pop(), m-1;continue;}
            if((m = /^./.exec(this.str)) && this.hl(m[0], 'dsString;color:#ff0000')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment;color:#0000ff;fontStyle:italic');
        }
        this.pop();
    },
    doxygen_mL_TagWordString: function doxygen_mL_TagWordString(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/') return this.pop();
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if((m = /^\S(?=&wordsep;)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;fontStyle:normal;fontWeight:bold')) return this.pop();
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;fontStyle:normal;fontWeight:bold')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment;color:#0000ff;fontStyle:italic');
        }
        this.pop();
    },
    doxygen_mL_htmltag: function doxygen_mL_htmltag(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/') return this.pop();
            if(this.str[0] == '/' && this.str[1] == '>' && this.hl('/>', 'dsKeyword;color:#000000;fontStyle:normal;fontWeight:bold')) return this.pop();
            if(this.str[0] == '>' && this.hl('>', 'dsKeyword;color:#000000;fontStyle:normal;fontWeight:bold')) return this.pop();
            if((m = /^\s*=\s*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.doxygen_mL_identifiers())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    doxygen_mL_htmlcomment: function doxygen_mL_htmlcomment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/') return this.pop();
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if((m = /^-->/.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    doxygen_mL_identifiers: function doxygen_mL_identifiers(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/') return this.pop();
            if((m = /^\s*#?[a-zA-Z0-9]*/.exec(this.str)) && m[0].length && this.hl(m[0], 'dsOthers')) return this.pop();
            if(this.str[0] == '\'' && this.hl('\'', 'dsDataType')) {if(m = this.doxygen_mL_types1())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsDataType')) {if(m = this.doxygen_mL_types2())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    doxygen_mL_types1: function doxygen_mL_types1(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/') return this.pop();
            if(this.str[0] == '\'' && this.hl('\'', 'dsDataType')) return this.pop(), 1;
            this.hl(this.str[0], 'dsDataType');
        }
        this.pop();
    },
    doxygen_mL_types2: function doxygen_mL_types2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/') return this.pop();
            if(this.str[0] == '"' && this.hl('"', 'dsDataType')) return this.pop(), 1;
            this.hl(this.str[0], 'dsDataType');
        }
        this.pop();
    },
    doxygen_sL_TagWord: function doxygen_sL_TagWord(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if(/^(?:\\a|@a|\\anchor|@anchor|\\b|@b|\\c|@c|\\cond|@cond|\\copybrief|@copybrief|\\copydetails|@copydetails|\\copydoc|@copydoc|\\def|@def|\\dir|@dir|\\dontinclude|@dontinclude|\\e|@e|\\elseif|@elseif|\\em|@em|\\enum|@enum|\\example|@example|\\exception|@exception|\\exceptions|@exceptions|\\extends|@extends|\\file|@file|\\htmlinclude|@htmlinclude|\\if|@if|\\ifnot|@ifnot|\\implements|@implements|\\include|@include|\\includelineno|@includelineno|\\link|@link|\\memberof|@memberof|\\namespace|@namespace|\\p|@p|\\package|@package|\\property|@property|\\relatedalso|@relatedalso|\\relatesalso|@relatesalso|\\related|@related|\\relates|@relates|\\retval|@retval|\\throw|@throw|\\throws|@throws|\\verbinclude|@verbinclude|\\version|@version|\\xrefitem|@xrefitem)\b/.exec(this.str)) return this.pop();
            if((m = /^\S(?=&wordsep;)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;fontStyle:normal;fontWeight:bold')) return this.pop();
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;fontStyle:normal;fontWeight:bold')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment;color:#0000ff;fontStyle:italic');
        }
        this.pop();
    },
    doxygen_sL_TagParam: function doxygen_sL_TagParam(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if((m = /^\[in]/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_sL_Tag2ndWord())return this.pop(), m-1;continue;}
            if((m = /^\[out]/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_sL_Tag2ndWord())return this.pop(), m-1;continue;}
            if((m = /^\[in,out]/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_sL_Tag2ndWord())return this.pop(), m-1;continue;}
            if((m = /^\S(?=&wordsep;)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;fontStyle:normal;fontWeight:bold')) return this.pop();
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;fontStyle:normal;fontWeight:bold')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment;color:#0000ff;fontStyle:italic');
        }
        this.pop();
    },
    doxygen_sL_TagWordWord: function doxygen_sL_TagWordWord(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if((m = /^\S(?=&wordsep;)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_sL_Tag2ndWord())return this.pop(), m-1;continue;}
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;fontStyle:normal;fontWeight:bold')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment;color:#0000ff;fontStyle:italic');
        }
        this.pop();
    },
    doxygen_sL_Tag2ndWord: function doxygen_sL_Tag2ndWord(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if((m = /^\S(?=&wordsep;)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;fontStyle:normal;fontWeight:bold')) return this.pop(), 1;
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;fontStyle:normal;fontWeight:bold')) continue;
            if(this.str[0] == '\n') return this.pop(), 1;
            this.hl(this.str[0], 'dsComment;color:#0000ff;fontStyle:italic');
        }
        this.pop();
    },
    doxygen_sL_TagString: function doxygen_sL_TagString(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.doxygen_sL_htmlcomment())return this.pop(), m-1;continue;}
            if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if((m = /^<\/?[a-zA-Z_:][a-zA-Z0-9._:-]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000000;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_sL_htmltag())return this.pop(), m-1;continue;}
            if((m = /^./.exec(this.str)) && this.hl(m[0], 'dsString;color:#ff0000')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment;color:#0000ff;fontStyle:italic');
        }
        this.pop();
    },
    doxygen_sL_TagWordString: function doxygen_sL_TagWordString(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if((m = /^\S(?=&wordsep;)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;fontStyle:normal;fontWeight:bold')) return this.pop();
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;fontStyle:normal;fontWeight:bold')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment;color:#0000ff;fontStyle:italic');
        }
        this.pop();
    },
    doxygen_sL_htmltag: function doxygen_sL_htmltag(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '/' && this.str[1] == '>' && this.hl('/>', 'dsKeyword;color:#000000;fontStyle:normal;fontWeight:bold')) return this.pop();
            if(this.str[0] == '>' && this.hl('>', 'dsKeyword;color:#000000;fontStyle:normal;fontWeight:bold')) return this.pop();
            if((m = /^\s*=\s*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.doxygen_sL_identifiers())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    doxygen_sL_htmlcomment: function doxygen_sL_htmlcomment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if((m = /^-->/.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    doxygen_sL_identifiers: function doxygen_sL_identifiers(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\s*#?[a-zA-Z0-9]*/.exec(this.str)) && m[0].length && this.hl(m[0], 'dsOthers')) return this.pop();
            if(this.str[0] == '\'' && this.hl('\'', 'dsDataType')) {if(m = this.doxygen_sL_types1())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsDataType')) {if(m = this.doxygen_sL_types2())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    doxygen_sL_types1: function doxygen_sL_types1(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\'' && this.hl('\'', 'dsDataType')) return this.pop(), 1;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsDataType');
        }
        this.pop();
    },
    doxygen_sL_types2: function doxygen_sL_types2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsDataType')) return this.pop(), 1;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsDataType');
        }
        this.pop();
    },
    doxygen_sL_DetectEnv: function doxygen_sL_DetectEnv(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[@\\]code\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_code())return this.pop(), m-1;continue;}
            if((m = /^[@\\]verbatim\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_verbatim())return this.pop(), m-1;continue;}
            if((m = /^[@\\]f\[/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_formula())return this.pop(), m-1;continue;}
            if((m = /^[@\\]msc\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_msc())return this.pop(), m-1;continue;}
            if((m = /^[@\\]dot\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_dot())return this.pop(), m-1;continue;}
            if((m = /^(?:\\note|@note)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#81ca2d;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^(?:\\warning|@warning)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca9219;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^(?:\\attention|@attention)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#e85848;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^(?:\\todo|@todo)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^&[A-Za-z]+;/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#4086C0;fontStyle:italic;fontWeight:bold')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment;color:#0000ff;fontStyle:italic');
        }
        this.pop();
    },
    doxygen_sL_DetectComment: function doxygen_sL_DetectComment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment;color:#0000ff;fontStyle:italic')) return this.pop(), 1;
            if(this.str[0] == '*' && this.hl('*', 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if((m = /^\/\/\//.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment;color:#0000ff;fontStyle:italic');
        }
        this.pop();
    },
    doxygen_code: function doxygen_code(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment;color:#0000ff;fontStyle:italic')) return this.pop(), 1;
            if(this.str[0] == '*' && this.hl('*', 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if((m = /^\/\/\//.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if((m = /^[@\\]endcode\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    doxygen_verbatim: function doxygen_verbatim(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment;color:#0000ff;fontStyle:italic')) return this.pop(), 1;
            if(this.str[0] == '*' && this.hl('*', 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if((m = /^\/\/\//.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if((m = /^[@\\]endverbatim\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    doxygen_formula: function doxygen_formula(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment;color:#0000ff;fontStyle:italic')) return this.pop(), 1;
            if(this.str[0] == '*' && this.hl('*', 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if((m = /^\/\/\//.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if((m = /^[@\\]f\]/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) return this.pop();
            this.hl(this.str[0], 'dsComment;color:#00A000;fontStyle:italic');
        }
        this.pop();
    },
    doxygen_msc: function doxygen_msc(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment;color:#0000ff;fontStyle:italic')) return this.pop(), 1;
            if(this.str[0] == '*' && this.hl('*', 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if((m = /^\/\/\//.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if((m = /^[@\\]endmsc\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) return this.pop();
            this.hl(this.str[0], 'dsComment;color:#00A000;fontStyle:italic');
        }
        this.pop();
    },
    doxygen_dot: function doxygen_dot(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment;color:#0000ff;fontStyle:italic')) return this.pop(), 1;
            if(this.str[0] == '*' && this.hl('*', 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if((m = /^\/\/\//.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if((m = /^[@\\]enddot\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) return this.pop();
            this.hl(this.str[0], 'dsComment;color:#00A000;fontStyle:italic');
        }
        this.pop();
    }
};
