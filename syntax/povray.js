var HL = function HL(){};
HL.prototype.run = function run(str) {
    this.str = str;
    this.pos = 0;
    this.len = str.length;
    this.main = document.createElement('div');
    this.hlText = '';
    this.style = 'dsNormal';
    this._normal();
    this.hl('');
    return this.main;
};
HL.prototype.hl = function hl(m,s) {
    this.pos += m.length;
    this.str = this.str.slice(m.length);
    if(this.style == s)
        this.hlText += m;
    else {
        if(this.hlText) {
            if(this.style == 'dsNormal')
                this.main.appendChild(document.createTextNode(this.hlText));
            else {
                var span = document.createElement('span');
                span.appendChild(document.createTextNode(this.hlText));
                span.className = this.style;
                this.main.appendChild(span);
            }
        }
        this.style = s;
        this.hlText = m;
    }
    return true;
};
HL.prototype._normal = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^#declare/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._declaration();continue;}
        if((m = /^#local/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._declaration();continue;}
        if((m = /^#macro/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._macro();continue;}
        if((m = /^(?:bicubic_patch|blob|box|cone|cubic|cylinder|difference|disc|height_field|intersection|isosurface|julia_fractal|lathe|light_source|merge|mesh|mesh2|object|parametric|plane|poly|polygon|prism|quadric|quartic|smooth_triangle|sor|sphere|sphere_sweep|superellipsoid|text|torus|triangle|union)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:aa_threshold|aa_level|absorption|agate|agate_turb|ambient|average|black_hole|blue|boxed|brick_size|brick|brilliance|bumps|bump_map|bump_size|caustics|cells|checker|color_map|colour_map|color|colour|conserve_energy|control0|control1|crackle|crand|cubic_wave|cylindrical|density_file|density_map|density|dents|diffuse|dist_exp|double_illuminate|eccentricity|emission|exponent|exterior|extinction|facets|fade_colour|fade_color|fade_distance|fade_power|filter|finish|form|frequency|fresnel|gradient|granite|gray|green|hexagon|hypercomplex|interior_texture|image_map|image_pattern|interior|interpolate|intervals|ior|irid|irid_wavelength|julia|lambda|leopard|magnet|mandel|map_type|marble|material_map|material|media|metallic|method|metric|mortar|normal|normal_map|number_of_waves|octaves|omega|once|onion|orientation|phase|phong_size|phong|pigment_map|pigment|planar|quaternion|quick_color|quick_colour|quilted|radial|ramp_wave|red|reflection_exponent|reflection|repeat|rgbft|rgbf|rgbt|rgb|ripples|roughness|samples|scallop_wave|scattering|sine_wave|slope_map|slope|solid|specular|spherical|spiral1|spiral2|spotted|texture_list|texture_map|texture|tile2|tiles|normal|toroidal|transmit|triangle_wave|turbulence|turb_depth|use_alpha|use_color|use_colour|use_index|uv_mapping|warp|waves|wood|wrinkles|cutaway_textures|pigment_pattern|no_bump_scale)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:matrix|rotate|scale|translate|transform)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:df3|gif|iff|jpeg|pgm|png|pot|ppm|tga|tiff|ttf)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:clock|clock_delta|clock_on|final_clock|final_frame|frame_number|image_height|image_width|initial_clock|initial_frame|t|u|v|x|y|z)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:false|no|off|on|pi|true|yes)\b/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^(?:abs|acos|acosh|asc|asin|asinh|atan|atan2|atanh|ceil|chr|concat|cos|cosh|cube|defined|degress|dimension_size|dimensions|div|exp|file_exists|floor|inside|int|ln|log|max|min|mod|pow|prod|pwr|radians|rand|seed|select|sin|sinh|sqrt|str|strcmp|strlen|strlwr|strupr|substr|sum|tan|tanh|trace|val|vaxis_rotate|vcross|vdot|vlength|vnormalize|vrotate|vstr|vturbulence)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:#debug|#default|#else|#end|#error|#fclose|#fopen|#if|#ifdef|#ifndef|#include|#range|#read|#render|#statistics|#switch|#undef|#version|#warning|#while|#write)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^(?:aa_threshold|aa_level|absorption|abs|accuracy|acosh|acos|adaptive|adc_bailout|agate|agate_turb|all_intersections|all|alpha|always_sample|altitude|ambient_light|ambient|angle|aperture|append|arc_angle|area_light|array|ascii|asc|asinh|asin|assumed_gamma|atan2|atanh|atan|average|background|bezier_spline|bicubic_patch|black_hole|blob|blue|blur_samples|bounded_by|boxed|box|bozo|brick_size|brick|brightness|brilliance|bumps|bump_map|bump_size|b_spline|camera|caustics|ceil|cells|charset|checker|chr|circular|clipped_by|clock_delta|clock_on|clock|color_map|colour_map|color|colour|component|composite|concat|cone|confidence|conic_sweep|contained_by|control0|control1|coords|cosh|cos|count|crackle|crand|cube|cubic_spline|cubic|cubic_wave|cylinder|cylindrical|defined|degrees|density_file|density_map|density|dents|df3|difference|diffuse|dimensions|dimension_size|direction|disc|dispersion|dispersion_samples|distance_maximum|distance|dist_exp|div|double_illuminate|eccentricity|emission|error_bound|evaluate|exp|exponent|exterior|extinction|facets|face_indices|fade_colour|fade_color|fade_distance|fade_power|falloff_angle|falloff|false|file_exists|shadowless|filter|final_clock|final_frame|finish|fisheye|flatness|flip|floor|focal_point|fog_alt|fog_offset|fog|fog_type|form|frame_number|frequency|fresnel|function|gif|global_settings|gradient|granite|gray|gray_threshold|green|height_field|hexagon|hf_gray_16|hierarchy|hollow|hypercomplex|image_width|image_height|initial_clock|initial_frame|interior_texture|iff|image_map|image_pattern|inside|inside_vector|interior|interpolate|intersection|intervals|int|inverse|ior|irid|irid_wavelength|isosurface|jitter|julia|julia_fractal|jpeg|lambda|lathe|leopard|light_group|light_source|linear_spline|linear_sweep|ln|load_file|location|log|looks_like|look_at|low_error_factor|magnet|major_radius|mandel|map_type|marble|material_map|material|matrix|max_extent|max_gradient|max_intersections|max_iteration|max_sample|max|max_trace_level|max_trace|media_attenuation|media_interaction|media|merge|mesh2|mesh|metallic|method|metric|minimum_reuse|min_extent|min|mod|mortar|natural_spline|nearest_count|normal|normal_indices|normal_map|normal_vectors|no_image|no_reflection|no_shadow|no|number_of_waves|object|octaves|offset|off|omega|omnimax|once|onion|on|open|orientation|orient|orthographic|panoramic|parallel|parametric|pattern|perspective|pgm|phase|phong_size|phong|pigment_map|pigment|pi|planar|plane|png|point_at|polygon|poly|poly_wave|pot|pow|ppm|precision|precompute|pretrace_start|pretrace_end|prism|prod|projected_through|pwr|quadratic_spline|quadric|quartic|quaternion|quick_color|quick_colour|quilted|radial|radians|radiosity|radius|rainbow|ramp_wave|rand|range|ratio|reciprocal|recursion_limit|red|reflection_exponent|reflection|refraction|repeat|rgbft|rgbf|rgbt|rgb|right|ripples|rotate|roughness|samples|save_file|scale|scallop_wave|scattering|seed|select|sine_wave|sinh|sin|size|sky_sphere|sky|slice|slope_map|slope|smooth|smooth_triangle|solid|sor|specular|sphere_sweep|sphere|spherical|spiral1|spiral2|spline|spotlight|spotted|sqrt|sqr|statistics|strcmp|strength|strlen|strlwr|strupr|str|sturm|substr|sum|superellipsoid|sys|tanh|tan|texture_list|texture_map|texture|text|tga|thickness|threshold|tiff|tightness|tile2|tiles|normal|tolerance|toroidal|torus|trace|transform|translate|transmit|triangle|triangle_wave|true|ttf|turbulence|turb_depth|type|t|ultra_wide_angle|union|up|use_alpha|use_color|use_colour|use_index|utf8|uv_indices|uv_mapping|uv_vectors|u_steps|u|val|variance|vaxis_rotate|vcross|vdot|vertex_vectors|vlength|vnormalize|vrotate|vstr|vturbulence|v_steps|v|warning|warp|water_level|waves|while|width|wood|wrinkles|write|x|yes|y|z|photons|steps|pass_through|collect|autostop|gather|split_union|expand_thresholds|spacing|global|target|conserve_energy|cutaway_textures|pigment_pattern|no_bump_scale|global_lights|internal|noise_generator)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:akima_spline|aoi|basic_x_spline|camera_view|displace|exposure|exposure_gain|extended_x_spline|float|frame_step|date|start_chrono|current_chrono|general_x_spline|glow|h_align_left|h_align_right|h_align_center|v_align_top|v_align_bottom|v_align_center|inverted_normals|is|listed|mpeg|n_roots|noise_pigment|output_filename|post_process|projection|point|blur|set|sor_spline|string|structure|tcb_spline|tension|continuity|bias|user_defined|vector|unofficial_version|gravity|environment|friction|damping|simcloth|wind|neighbors|neighbours|internal_collision|viscosity|iterations|input|mesh_output|smooth_mesh|uv_mesh|output|stiffness|topology|mass|connection|face|velocity|position|mass_count|connection_count|face_count|index1|index2|index3|time|time_step|step_count|start_time|end_time|fixed|collision|interaction|group|attach|field|mechsim|bounding|viscoelastic|viscoelastic_count|element|length|force|message|weight|randomize|hdr|no_radiosity|motion_blur|tone_mapping|show_samples|show_low_count)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if((m = /^//\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if((m = /^//\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {this._commentar1();continue;}
        if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {this._commentar2();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
        if((m = /^[:!%&()+,\-/.*<=>?[\]{|}~\^;]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._declaration = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\w+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._declare_Keyword();continue;}
        if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^[=[(]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._#pop#pop();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsKeyword');
    }
};
HL.prototype._macro = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\w+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._declare_Macro();continue;}
        if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == '(' && this.hl('(', 'dsNormal')) {this._#pop#pop();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsKeyword');
    }
};
HL.prototype._declare_Keyword = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^[=[(]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._#pop#pop();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsKeyword');
    }
};
HL.prototype._declare_Macro = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == '(' && this.hl('(', 'dsNormal')) {this._#pop#pop();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsKeyword');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._commentar1 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?:FIXME|TODO|###)\b/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._commentar2 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?:FIXME|TODO|###)\b/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._commentar = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
