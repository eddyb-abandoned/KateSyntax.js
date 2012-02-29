var HL = function HL(){};
HL.prototype.run = function run(str) {
    this.str = str;
    this.pos = 0;
    this.len = str.length;
    this.main = document.createElement('div');
    this.hlText = '';
    this.style = 'dsNormal';
    this._normalText();
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
HL.prototype._normalText = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?:accum|as|ascending|BASE|be|begin|bfgs|bhhh|brrweight|clean|close|clpatt \[ern]|clwidth|cole|color|confirm|continue|cov\(unstr\)|cov\(unstructured\)|covariance|dash|define|deft|delmacs|detail|dev|deviations|dfp|difficult|dirname|do|effects|eform|else|emdots|emiterate|emlog|emonly|emtolerance|end|error|estmetric|exchangeable|exit|family|fe|fitted|force|foreach|forvalues|fpc|frequency|function|global|gtolerance|hessian|ic|identity|if|in|independent|intpoints|irr|iterate|jkrweight|lincom|linearized|local|long|ltolerance|macro|manage|meff|meft|minimize|mle|mse|multiplier|noclear|nocons|noconstant|nodots|nofetable|nogroup|noheader|nolog|nolrtest|none|nonrtolerance|noobs|noomit|noretable|nostderr|not|nr|of|offset|or|p|parse|patterns|poststrata|postweight|prefix|program|r2_p|reffects|reml|reset|resid|run|scale|shift|showstep|SITE|size|star|stats|STBPLUS|stfmt|store|strata|syntax|tempfile|tempname|tempvar|tokenize|tolerance|unstructured|until|UPDATES|weight|while|wide|window|x2|xb|_b\[|_coeff\[|ereturn|rreturn|sreturn|e\(|r\(|s\()\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:allstring|append|args|aweight|born|by|bys|bysort|byte|capture|cfreq|clear|Cns|Co|collinear|columns|comma|compress|connect|console|cpercent|cr|d0|data|datestring|decode|delimit|depnames|desc|describe|di|diparm_options|display|double|drop|eclass|encode|esample|Ev|exec|fam|fdadescribe|fdasave|fdause|filefilter|float|format|fweight|gen|generate|gr \[een]|gradient|hold|include|insert|insheet|int|iweight|k|keep|label|Ld|link|load|long|longstub|macrolen|markout|marksample|maximize|meanonly|mlmatsbysum|mlout|mode|model|more|N|namelen|noextend|nofootnote|noi|noisily|nolabel|nonotes|nopreserve|norescale|noscvars|nosummary|nototal|nrtolerance|obs|odbc|off|oim|on|oneway|opg|order|outfile|outsheet|percent|permanently|post|postclose|postfile|preserve|Psi|pweight|query|qui|quietly|rawsum|red|ren|rename|replace|Replay|report|repost|restore|robust|save|saving|SD|SE|search|set|shownrtolerance|sort|sqlfile|sqlshow|STATA|statistics|sum|summarize|t1title|t2title|tab|tabulate|technique|timer|total|unhold|unique|uniquemaster|uniqusing|use|using|V|values|variable|varlist|VCE|waldtest|width|xlabel|xmlsave|xmluse|yellow|ylabel|yline)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:_a_cls_msg|_addgph|_assert|_assert_mreldif|_assert_mreldifp|_assert_mreldifs|_assert_obs|_assert_streq|_at|_bigtab|_binperfect|_binperfout|_biplotmat|_brr_sum|_bs_display|_bs_sum|_btcmd|_byoptnotallowed|_ca_parse_normalize|_callerr|_cci|_check_eformopt|_check4gropts|_choice_table|_ckirfset|_cknotsvaroi|_ckvec|_clsarr2list|_cmdxel|_coef_table|_coef_table_header|_confirm_date|_confirm_number_or_date|_copy_mat_stripes|_cpmatnm|_crc2use|_crc4fld|_crcacnt|_crcar1|_crcause|_crcbin|_crcbygr|_crcchi2|_crcchkw|_crccip|_crceprs|_crcgldv|_crcglil|_crcird|_crcirr|_crcmeq|_crcnuse|_crcor|_crcphdr|_crcra|_crcrd|_crcrr|_crcseq|_crcshdr|_crcslbl|_crcsrvc|_crcswxx|_crcunab|_crcunit|_crcvarl|_crcwsrv|_crczsku|_cvar|_date2elapsed|_diag2mat|_diparm|_diparm_8|_dots|_e2r|_egennoby|_evlist|_exp_list_expand|_exp_list_parse|_find_tsops|_fr_area_parse_and_log|_fr_aspect_parse_and_log|_fr_draw_rect|_fr_droplines_draw|_fr_erasearr|_fr_legend_parse_and_log|_fr_merged_implicit|_fr_runlog|_fr_sztextbox_parse_and_log|_fr_tbstyle_parse_and_log|_fr_tedits_parse_and_log|_fr_textbox_parse_and_log|_fr_title_parse_and_log|_fr_x_log_cleanup|_fr_x_log_create|_fracpp|_fracxo|_frr_sztextbox_pnl|_gany|_ganycount|_ganymatch|_ganyvalue|_gconcat|_gcount|_gcut|_gdiff|_gends|_geqany|_get_diparmopts|_get_diparmopts_8|_get_eformopts|_get_eqspec|_get_gropts|_get_irf|_get_offopt|_getbv|_getcovcorr|_getfilename|_getnewlabelname|_getrhs|_getvarcns|_getxel|_getxel2|_gfill|_ggroup|_giqr|_gkurt|_gm_edit|_gm_log|_gma|_gmad|_gmax|_gmdev|_gmean|_gmedian|_gmin|_gmode|_gmtr|_gneqany|_gpc|_gpctile|_gr_arrowhead|_gr_atomize_styles|_gr_common_axes|_gr_drawrect|_gr_linkstyles|_gr_symbol_of|_grank|_grfirst|_grlast|_grmax|_grmean|_grmin|_grmiss|_grobs|_growfirst|_growlast|_growmax|_growmean|_growmin|_growmiss|_grownonmiss|_growsd|_growtotal|_grsd|_grsum|_gs_addgrname|_gs_bygraph|_gs_clean_graphlist|_gs_default_bands|_gs_islivefile|_gs_parse_and_log_axoptions|_gs_parse_and_log_axtitle|_gs_parse_and_log_lines|_gs_parse_and_log_tickset|_gs_rdfilehdr|_gs_wrfilehdr|_gs_x_create|_gsd|_gseq|_gskew|_gstd|_gsum|_gtag|_gtotal|_hadamard_verify|_hw_comp|_hw_opt_d0|_hwsa_comp|_hwsa_opt_d0|_hwsm_comp|_hwsm_opt_d0|_isfit|_ivreg_project|_jk_nlegend|_jk_pseudo|_jk_sum|_labels2names|_linemax|_loop_brr|_loop_jknife|_loop_jknife_fw|_loop_jknife_iw|_loop_jknife2|_loop_rw|_lrtest7|_m2matrix|_m2scalar|_matplot|_matsort|_mdisplay|_mds_classical|_mds_dataheader|_mds_display|_mds_display_classical|_mds_euclidean|_mds_parse_dopts|_mds_parse_method|_mds_parse_s2d|_mds_s2d|_me_der|_me_der2|_me_derb|_me_derd|_me_l_der|_me_l_der2|_mfrmvec|_mka2|_mkg|_mkkmn|_mksigma|_mkvec|_mprobitestimator|_mtest|_mvec|_no_estat|_no_predict|_nobs|_on_colon_parse|_parmlist|_parse_optexp|_parsewt|_pk_p|_plotpos|_pred_me|_pred_se|_prefix_check4esample|_prefix_checkopt|_prefix_clear|_prefix_command|_prefix_display|_prefix_expand|_prefix_explist|_prefix_footnote|_prefix_getchars|_prefix_getmat|_prefix_legend|_prefix_mlogit|_prefix_model_test|_prefix_note|_prefix_reject|_prefix_relabel_eqns|_prefix_run_error|_prefix_saving|_prefix_title|_prefix_vcenotallowed|_qsort_index|_qsur|_r2e|_repost|_resample_warn|_restore_labels|_returnclear|_rmdcoll|_robust2|_roccom1|_roccom1_8|_rocsen|_rotate_clear|_rotate_text|_score_spec|_set_irf_vars|_shortenpath|_sigfm|_small2dotz|_stata_internalerror|_stcurv|_strip_labels|_sttrend|_stubstar2names|_sum_table|_sumaccum|_sunflower_binar|_svar_cnsmac|_svar_eqmac|_svar_newcns|_svar_post|_svard2|_svariden|_svaridenlr|_svarlrd2|_svd|_svy_check_cmdopts|_svy_check_fpc|_svy_check_postw|_svy_check_predict|_svy_check_vce|_svy_fpc_note|_svy_ftest|_svy_ivreg_first|_svy_mkdeff|_svy_mkmeff|_svy_mkvmsp|_svy_mkvsrs|_svy_newrule|_svy_setup|_svy_singleton_note|_svy_subpop|_svy_subpop_note|_svy_summarize|_svy_summarize_legend|_svy_tabulate|_svy2|_svydes_dlg|_svylc|_svyset|_sw_ood|_ts|_ts_dexp|_ts_exp|_ts_hw|_ts_hwsa|_ts_hwsm|_tsheadr|_tsinchk|_tsma|_ttest|_ttest1|_ttest2|_tutends|_var_mka|_varbsf|_vardisprmse|_varfcast|_varfcast_clear|_varfcast_fcast|_varfcast_graph|_varirf|_varsim|_vce_parserun|_vec_ckgraph|_vec_dreduced|_vec_grcroots|_vec_opck|_vec_pgparse|_vec_pgridplots|_vec_postvar|_vecauxdisp|_vecfcast_compute|_vecfcast_compute_w|_vecgetacns|_vecgetcv|_vecgtn|_vecmka|_vecmkapvp|_vecmkce|_vecmkgam|_vecmksi|_vecmktrend|_vecortho|_vecpclean|_vectparse|_vecu|_virf_add|_virf_char|_virf_fck|_virf_mknewfile|_virf_nlen|_virf_use|_writenum|_xtreg_chk_cl|ac|ac_7|acprplot|acprplot_7|adjust|adopath|alpha|ameans|anova_estat|anova_terms|aorder|arch|arch_dr|arch_estat|arch_p|archlm|areg|areg_p|arima|arima_dr|arima_estat|arima_p|asmprobit|asmprobit_estat|asmprobit_lf|asmprobit_p|avplot|avplot_7|avplots|avplots_7|bcskew0|bgodfrey|binreg|bip0_lf|biplot|bipp_lf|bipr_lf|bipr_p|biprobit|bitest|bitesti|bitowt|blogit|bmemsize|boot|bootsamp|bootstrap|bootstrap_8|boxco_l|boxco_p|boxcox|boxcox_6|boxcox_p|bprobit|brier|brr|brrstat|bs|bs_7|bsampl_w|bsample|bsample_7|bsqreg|bstat|bstat_7|bstat_8|bstrap|bstrap_7|ca|ca_estat|ca_p|cabiplot|camat|canon|canon_8|canon_8_p|canon_estat|canon_p|caprojection|cc|cchart|cchart_7|cci|censobs_table|centile|cf|checkdlgfiles|checkhlpfiles|ci|cii|classutil|clear|clo|clog|clog_lf|clog_p|clogi|clogi_sw|clogit|clogit_lf|clogit_p|clogitp|clogl_sw|cloglog|clonevar|clslistarray|cluster|cluster_measures|cluster_stop|cluster_tree|cluster_tree_8|clustermat|cnr|cnre|cnreg|cnreg_p|cnreg_sw|cnsreg|codebook|collaps4|collapse|colormult_nb|colormult_nw|compare|conren|contract|copyright|copysource|corc|corr_anti|corr_kmo|corr_smc|corr2data|corrgram|cox_p|cox_sw|coxbase|coxhaz|coxvar|cprplot|cprplot_7|crc|cross|cs|cscript|cscript_log|csi|ct|ct_is|ctset|ctst_5|ctst_st|cttost|cumsp|cumsp_7|cumul|cusum|cusum_7|cutil|d|datetof|db|dbeta|de|deff|des|desc|descr|descri|describ|describe|destring|dfbeta|dfgls|dfuller|dirstats|disp_res|disp_s|dotplot|dotplot_7|dprobit|drawnorm|ds|ds_util|dstdize|duplicates|durbina|dwstat|dydx|egen|eivreg|emdef|eq|ereg|ereg_lf|ereg_p|ereg_sw|ereghet|ereghet_glf|ereghet_glf_sh|ereghet_gp|ereghet_ilf|ereghet_ilf_sh|ereghet_ip|est|est_cfexist|est_cfname|est_clickable|est_expand|est_hold|est_table|est_unhold|est_unholdok|estat|estat_default|estat_summ|estat_vce_only|esti|estimates|etodow|etof|etomdy|expandcl|fac|fact|facto|factor|factor_estat|factor_p|factor_pca_rotated|factor_rotate|factormat|fcast|fcast_compute|fcast_graph|fh_st|fillin|find_hlp_file|findfile|findit|findit_7|fit|for|for5_0|fpredict|frac_154|frac_adj|frac_chk|frac_cox|frac_ddp|frac_dis|frac_dv|frac_in|frac_mun|frac_pp|frac_pq|frac_pv|frac_wgt|frac_xo|fracgen|fracplot|fracplot_7|fracpoly|fracpred|fron_ex|fron_hn|fron_p|fron_tn|fron_tn2|frontier|ftodate|ftoe|ftomdy|ftowdate|gamhet_glf|gamhet_gp|gamhet_ilf|gamhet_ip|gamma|gamma_d2|gamma_p|gamma_sw|gammahet|gdi_hexagon|gdi_spokes|genrank|genstd|genvmean|gladder|gladder_7|glim_l01|glim_l02|glim_l03|glim_l04|glim_l05|glim_l06|glim_l07|glim_l08|glim_l09|glim_l10|glim_l11|glim_l12|glim_lf|glim_mu|glim_nw1|glim_nw2|glim_nw3|glim_p|glim_v1|glim_v2|glim_v3|glim_v4|glim_v5|glim_v6|glim_v7|glm|glm_6|glm_p|glm_sw|glmpred|glogit|glogit_8|glogit_p|gmeans|gnbre_lf|gnbreg|gnbreg_5|gnbreg_p|gomp_lf|gompe_sw|gomper_p|gompertz|gompertzhet|gomphet_glf|gomphet_glf_sh|gomphet_gp|gomphet_ilf|gomphet_ilf_sh|gomphet_ip|gphdot|gphpen|gphprint|gprobi_p|gprobit|gprobit_8|gr|gr_copy|gr_current|gr_db|gr_describe|gr_dir|gr_draw|gr_draw_replay|gr_drop|gr_edit|gr_editviewopts|gr_example|gr_example2|gr_export|gr_print|gr_qscheme|gr_query|gr_read|gr_rename|gr_replay|gr_save|gr_set|gr_setscheme|gr_table|gr_undo|gr_use|graph|grebar|greigen|greigen_7|greigen_8|grmeanby|grmeanby_7|gs_fileinfo|gs_filetype|gs_graphinfo|gs_stat|gsort|gwood|h|hadimvo|hareg|hausman|he|heck_d2|heckma_p|heckman|heckp_lf|heckpr_p|heckprob|hel|help|hereg|hetpr_lf|hetpr_p|hetprob|hettest|hilite|hist|hist_7|histogram|hlogit|hlu|hmeans|hotel|hotelling|hprobit|hreg|icd9|icd9_ff|icd9p|iis|impute|imtest|inbase|integ|inten|intreg|intreg_7|intreg_p|intrg_ll|intrg_ll2|intrg2_ll|ipolate|iqreg|ir|irf|irf_create|irfm|iri|is_svy|is_svysum|isid|istdize|ivprob_1_lf|ivprob_lf|ivprobit|ivprobit_p|ivreg|ivreg_footnote|ivtob_1_lf|ivtob_lf|ivtobit|ivtobit_p|jackknife|jacknife|jknife|jknife_6|jknife_8|jkstat|joinby|kalarma1|kap|kap_3|kapmeier|kappa|kapwgt|kdensity|kdensity_7|ksm|ksmirnov|ktau|kwallis|labelbook|ladder|levels|levelsof|leverage|lfit|lfit_p|lincom|line|linktest|lloghet_glf|lloghet_glf_sh|lloghet_gp|lloghet_ilf|lloghet_ilf_sh|lloghet_ip|llogi_sw|llogis_p|llogist|llogistic|llogistichet|lnorm_lf|lnorm_sw|lnorma_p|lnormal|lnormalhet|lnormhet_glf|lnormhet_glf_sh|lnormhet_gp|lnormhet_ilf|lnormhet_ilf_sh|lnormhet_ip|lnskew0|loadingplot|logi|logis_lf|logistic|logistic_p|logit|logit_estat|logit_p|loglogs|logrank|loneway|lookfor|lowess|lowess_7|lpredict|lrecomp|lroc|lroc_7|lrtest|lsens|lsens_7|lsens_x|lstat|ltable|ltable_7|ltriang|lv|lvr2plot|lvr2plot_7|makecns|manova_estat|manova_p|mantel|mat_capp|mat_order|mat_rapp|mata_matdescribe|mata_matsave|mata_matuse|matalabel|matcproc|matlist|matname|matstrik|mcc|mcci|md0_|md1_|md1debug_|md2_|md2debug_|mds|mds_estat|mds_p|mdsconfig|mdslong|mdsmat|mdsshepard|mdytoe|mdytof|me_derd|mean|means|median|memsize|meqparse|mer|merg|merge|mfp|mfx|mhelp|mhodds|mixed_ll|mixed_ll_reparm|mkassert|mkmat|mkspline|ml|ml_5|ml_adjs|ml_bhhhs|ml_c_d|ml_check|ml_clear|ml_cnt|ml_debug|ml_defd|ml_e0|ml_e0_bfgs|ml_e0_cycle|ml_e0_dfp|ml_e0i|ml_e1|ml_e1_bfgs|ml_e1_bhhh|ml_e1_cycle|ml_e1_dfp|ml_e2|ml_e2_cycle|ml_ebfg0|ml_ebfr0|ml_ebfr1|ml_ebh0q|ml_ebhh0|ml_ebhr0|ml_ebr0i|ml_ecr0i|ml_edfp0|ml_edfr0|ml_edfr1|ml_edr0i|ml_eds|ml_eer0i|ml_egr0i|ml_elf|ml_elf_bfgs|ml_elf_bhhh|ml_elf_cycle|ml_elf_dfp|ml_elfi|ml_elfs|ml_enr0i|ml_enrr0|ml_erdu0|ml_erdu0_bfgs|ml_erdu0_bhhh|ml_erdu0_bhhhq|ml_erdu0_cycle|ml_erdu0_dfp|ml_erdu0_nrbfgs|ml_exde|ml_footnote|ml_geqnr|ml_grad0|ml_graph|ml_hbhhh|ml_hd0|ml_hold|ml_init|ml_inv|ml_log|ml_max|ml_mlout|ml_model|ml_nb0|ml_opt|ml_p|ml_plot|ml_query|ml_rdgrd|ml_repor|ml_s_e|ml_score|ml_searc|ml_technique|ml_unhold|mlf_|mlog|mlogi|mlogit|mlogit_footnote|mlogit_p|mlopts|mnl0_|mprobit|mprobit_lf|mprobit_p|mrdu0_|mrdu1_|mvdecode|mvencode|mvreg|mvreg_estat|nbreg|nbreg_al|nbreg_lf|nbreg_p|nbreg_sw|newey|newey_7|newey_p|nl|nl_7|nl_p|nl_p_7|nlcom|nlcom_p|nlexp2|nlexp2_7|nlexp2a|nlexp2a_7|nlexp3|nlexp3_7|nlgom3|nlgom3_7|nlgom4|nlgom4_7|nlinit|nllog3|nllog3_7|nllog4|nllog4_7|nlog_rd|nlogit|nlogit_p|nlogitgen|nlogittree|nlpred|note|notes|nptrend|numlabel|old_ver|olo|olog|ologi|ologi_sw|ologit|ologit_p|ologitp|op_colnm|op_comp|op_diff|op_inv|op_str|opr|opro|oprob|oprob_sw|oprobi|oprobi_p|oprobit|oprobitp|opts_exclusive|orthog|orthpoly|ovtest|pac|pac_7|palette|parse_dissim|pause|pca|pca_8|pca_display|pca_estat|pca_p|pca_rotate|pcamat|pchart|pchart_7|pchi|pchi_7|pcorr|pctile|pentium|pergram|pergram_7|permute|permute_8|personal|peto_st|pkcollapse|pkcross|pkequiv|pkexamine|pkexamine_7|pkshape|pksumm|pksumm_7|pnorm|pnorm_7|poisgof|poiss_lf|poiss_sw|poisso_p|poisson|poisson_estat|pperron|prais|prais_e|prais_e2|prais_p|predict|predictnl|print|prob|probi|probit|probit_estat|probit_p|proc_time|procoverlay|procrustes|procrustes_estat|procrustes_p|profiler|prop|proportion|prtest|prtesti|pwcorr|qby|qbys|qchi|qchi_7|qladder|qladder_7|qnorm|qnorm_7|qqplot|qqplot_7|qreg|qreg_c|qreg_p|qreg_sw|quadchk|quantile|quantile_7|range|ranksum|ratio|rchart|rchart_7|rcof|recast|recode|reg|reg3|reg3_p|regdw|regr|regre|regre_p2|regres|regres_p|regress|regress_estat|regriv_p|remap|renpfix|repeat|reshape|robvar|roccomp|roccomp_7|roccomp_8|rocf_lf|rocfit|rocfit_8|rocgold|rocplot|rocplot_7|roctab|roctab_7|rolling|rologit|rologit_p|rot|rota|rotat|rotate|rotatemat|rreg|rreg_p|runtest|rvfplot|rvfplot_7|rvpplot|rvpplot_7|safesum|sample|sampsi|savedresults|saveold|sc|scatter|scm_mine|sco|scob_lf|scob_p|scobi_sw|scobit|scor|score|scoreplot|scoreplot_help|scree|screeplot|screeplot_help|sdtest|sdtesti|separate|seperate|serrbar|serrbar_7|set_defaults|sfrancia|shewhart|shewhart_7|signrank|signtest|simul|simul_7|simulate|simulate_8|sktest|slogit|slogit_d2|slogit_p|smooth|snapspan|spearman|spikeplot|spikeplot_7|spikeplt|spline_x|split|sqreg|sqreg_p|ssc|st|st_ct|st_hc|st_hcd|st_hcd_sh|st_is|st_issys|st_note|st_promo|st_set|st_show|st_smpl|st_subid|stack|statsby|statsby_8|stbase|stci|stci_7|stcox|stcox_estat|stcox_fr|stcox_fr_ll|stcox_p|stcox_sw|stcoxkm|stcoxkm_7|stcstat|stcurv|stcurve|stcurve_7|stdes|stem|stepwise|stereg|stfill|stgen|stir|stjoin|stmc|stmh|stphplot|stphplot_7|stphtest|stphtest_7|stptime|strate|strate_7|streg|streg_sw|streset|sts|sts_7|stset|stsplit|stsum|sttocc|sttoct|stvary|stweib|suest|suest_8|sunflower|sureg|survcurv|survsum|svar|svar_p|svmat|svy|svy_disp|svy_dreg|svy_est|svy_est_7|svy_estat|svy_get|svy_gnbreg_p|svy_head|svy_header|svy_heckman_p|svy_heckprob_p|svy_intreg_p|svy_ivreg_p|svy_logistic_p|svy_logit_p|svy_mlogit_p|svy_nbreg_p|svy_ologit_p|svy_oprobit_p|svy_poisson_p|svy_probit_p|svy_regress_p|svy_sub|svy_sub_7|svy_x|svy_x_7|svy_x_p|svydes|svydes_8|svygen|svygnbreg|svyheckman|svyheckprob|svyintreg|svyintreg_7|svyintrg|svyivreg|svylc|svylog_p|svylogit|svymarkout|svymarkout_8|svymean|svymlog|svymlogit|svynbreg|svyolog|svyologit|svyoprob|svyoprobit|svyopts|svypois|svypois_7|svypoisson|svyprobit|svyprobt|svyprop|svyprop_7|svyratio|svyreg|svyreg_p|svyregress|svyset|svyset_7|svyset_8|svytab|svytab_7|svytest|svytotal|sw|sw_8|swcnreg|swcox|swereg|swilk|swlogis|swlogit|swologit|swoprbt|swpois|swprobit|swqreg|swtobit|swweib|symmetry|symmi|symplot|symplot_7|sysdescribe|sysuse|szroeter|tab_or|tab1|tab2|tabi|table|tabodds|tabodds_7|tabstat|te|tes|test|testnl|testparm|teststd|tetrachoric|time_it|tis|tob|tobi|tobit|tobit_p|tobit_sw|tostring|total|treat_ll|treatr_p|treatreg|trim|trnb_cons|trnb_mean|trpoiss_d2|trunc_ll|truncr_p|truncreg|tsappend|tset|tsfill|tsline|tsline_ex|tsreport|tsrline|tsset|tssmooth|tsunab|ttest|ttesti|tut_chk|tut_wait|tutorial|tw|tware_st|two|twoway|twoway__fpfit_serset|twoway__function_gen|twoway__histogram_gen|twoway__ipoint_serset|twoway__ipoints_serset|twoway__kdensity_gen|twoway__lfit_serset|twoway__normgen_gen|twoway__pci_serset|twoway__qfit_serset|twoway__scatteri_serset|twoway__sunflower_gen|twoway_ksm_serset|typeof|unab|unabbrev|uselabel|var|var_mkcompanion|var_p|varbasic|varfcast|vargranger|varirf|varirf_add|varirf_cgraph|varirf_create|varirf_ctable|varirf_describe|varirf_dir|varirf_drop|varirf_erase|varirf_graph|varirf_ograph|varirf_rename|varirf_set|varirf_table|varlmar|varnorm|varsoc|varstable|varstable_w|varstable_w2|varwle|vce|vec|vec_fevd|vec_mkphi|vec_p|vec_p_w|vecirf_create|veclmar|veclmar_w|vecnorm|vecnorm_w|vecrank|vecstable|verinst|viewsource|vif|vwls|wdatetof|webdescribe|webseek|webuse|weib_lf|weib_lf0|weib1_lf|weib2_lf|weibhet_glf|weibhet_glf_sh|weibhet_glfa|weibhet_glfa_sh|weibhet_gp|weibhet_ilf|weibhet_ilf_sh|weibhet_ilfa|weibhet_ilfa_sh|weibhet_ip|weibu_sw|weibul_p|weibull|weibull_c|weibull_s|weibullhet|whelp|wilc_st|wilcoxon|wntestb|wntestb_7|wntestq|xchart|xchart_7|xcorr|xcorr_7|xi|xi_6|xpose|xt_iis|xt_tis|xtab_p|xtabond|xtbin_p|xtclog|xtcloglog|xtcloglog_8|xtcloglog_d2|xtcloglog_re_p|xtcnt_p|xtcorr|xtdata|xtdes|xtfront_p|xtfrontier|xtgee|xtgee_elink|xtgee_estat|xtgee_makeivar|xtgee_p|xtgee_plink|xtgls|xtgls_p|xthaus|xthausman|xtht_p|xthtaylor|xtile|xtint_p|xtintreg|xtintreg_8|xtintreg_d2|xtintreg_p|xtivp_1|xtivp_2|xtivreg|xtline|xtline_ex|xtlogit|xtlogit_8|xtlogit_d2|xtlogit_fe_p|xtlogit_pa_p|xtlogit_re_p|xtmixed|xtmixed_estat|xtmixed_p|xtnb_fe|xtnb_lf|xtnbreg|xtnbreg_pa_p|xtnbreg_refe_p|xtpcse|xtpcse_p|xtpois|xtpoisson|xtpoisson_d2|xtpoisson_pa_p|xtpoisson_refe_p|xtpred|xtprobit|xtprobit_8|xtprobit_d2|xtprobit_re_p|xtps_fe|xtps_lf|xtps_ren|xtps_ren_8|xtrar_p|xtrc|xtrc_p|xtrchh|xtrefe_p|xtreg|xtreg_be|xtreg_fe|xtreg_ml|xtreg_pa_p|xtreg_re|xtregar|xtrere_p|xtsf_ll|xtsf_llti|xtsum|xttab|xttest0|xttobit|xttobit_8|xttobit_p|xttrans|yx|yxview__barlike_draw|yxview_area_draw|yxview_bar_draw|yxview_dot_draw|yxview_dropline_draw|yxview_function_draw|yxview_iarrow_draw|yxview_ilabels_draw|yxview_normal_draw|yxview_pcarrow_draw|yxview_pcbarrow_draw|yxview_pccapsym_draw|yxview_pcscatter_draw|yxview_pcspike_draw|yxview_rarea_draw|yxview_rbar_draw|yxview_rbarm_draw|yxview_rcap_draw|yxview_rcapsym_draw|yxview_rconnected_draw|yxview_rline_draw|yxview_rscatter_draw|yxview_rspike_draw|yxview_spike_draw|yxview_sunflower_draw|zap_s|zinb|zinb_llf|zinb_plf|zip|zip_llf|zip_p|zip_plf|zt_ct_5|zt_hc_5|zt_hcd_5|zt_is_5|zt_iss_5|zt_sho_5|zt_smp_5|ztbase_5|ztcox_5|ztdes_5|ztereg_5|ztfill_5|ztgen_5|ztir_5|ztjoin_5|ztnb|ztnb_p|ztp|ztp_p|zts_5|ztset_5|ztspli_5|ztsum_5|zttoct_5|ztvary_5|ztweib_5)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:addlabels|addlabopts|addplot|bar|barwidth|bin|blabel|caption|center|circle|circle_hollow|color|cols|combine|dot|draw|dropline|frequency|grid|hbar|imargin|labsize|legend|margin|medthick|mlabangle|mlabcolor|mlabel|mlabgap|mlabposition|mlabsize|mlabstyle|mlabtextstyle|mlabvposition|msymbol|name|nodraw|nogrid|over|plotregion|position|ring|rows|scale|size|start|subtitle|t1title|t2title|text|textsize|title|xcommon|xlabel|xline|xscale|xsize|xtitle|ycommon|ylabel|yline|yscale|ysize|ytitle|zero)\b/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^(?:background|bg|black|blue|bluishgray|brown|cranberry|cyan|dimgray|dkgreen|dknavy|dkorange|ebblue|ebg|edkblue|eggshell|eltblue|eltgreen|emerald|emidblue|erose|fg|foreground|forest_green|gold|gray|green|gs|khaki|lavender|lime|ltblue|ltbluishgray|ltkhaki|magenta|maroon|midblue|midgreen|mint|navy|none|olive|olive_teal|orange|orange_red|pink|purple|red|sand|sandb|sienna|stone|teal|white|yellow)\b/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^(?:abs|acos|asin|atan|atan2|atanh|ceil|cloglog|comb|cos|digamma|exp|floor|invcloglog|invlogit|ln|lnfact|lnfactorial|lngamma|log|log10|max|min|mod|reldif|round|sign|sin|sqrt|sum|tan|tanh|trigamma|trunc)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^(?:betaden|Binomial|binorm|binormal|chi2|chi2tail|dgammapda|dgammapdada|dgammapdadx|dgammapdx|dgammapdxdx|F|Fden|Ftail|gammaden|gammap|ibeta|invbinomial|invchi2|invchi2tail|invF|invFtail|invgammap|invibeta|invnchi2|invnFtail|invnibeta|invnorm|invnormal|invttail|nbetaden|nchi2|nFden|nFtail|nibeta|norm|normal|normalden|normd|npnchi2|tden|ttail|uniform\(\))\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^(?:abbrev|char|index|indexnot|length|lower|ltrim|match|plural|proper|real|regexm|regexr|regexs|reverse|rtrim|string|strlen|strlower|strltrim|strmatch|strofreal|strpos|strproper|strreverse|strrtrim|strtrim|strupper|subinstr|subinword|substr|trim|upper|word|wordcount)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^(?:_caller|autocode|byteorder|chop|clip|cond|e|epsdouble|epsfloat|group|inlist|inrange|irecode|matrix|maxbyte|maxdouble|maxfloat|maxint|maxlong|mi|minbyte|mindouble|minfloat|minint|minlong|missing|r|recode|replay|return|s|scalar)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^(?:d|date|day|dow|doy|halfyear|mdy|month|quarter|week|year)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^(?:d|daily|dofd|dofh|dofm|dofq|dofw|dofy|h|halfyearly|hofd|m|mofd|monthly|q|qofd|quarterly|tin|twithin|w|weekly|wofd|y|yearly|yh|ym|yofd|yq|yw)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^(?:cholesky|colnumb|colsof|corr|det|diag|diag0cnt|el|get|hadamard|I|inv|invsym|issym|issymmetric|J|matmissing|matuniform|mreldif|nullmat|rownumb|rowsof|sweep|syminv|trace|vec|vecdiag)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^(?:anycount|anymatch|anyvalue|at|concat|count|cut|diff|ends|field|fill|group|groupicodes|head|iqr|kurt|label|last|lname|mad|max|maxlength|maxmode|mdev|mean|median|min|minmode|missing|mode|mtr|nummodemissing|pc prop|pctile|punct|rank|rowfirst|rowlast|rowmax|rowmean|rowmin|rowmiss|rownonmiss|rowsd|rowtotal|sd|seq|skew|std|strok|tag|tail|total|track|trim|truncate)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^(?:_cholinv|_cholsolve|_corr|_edittoint|_edittointtol|_edittozero|_edittozerotol|_eigen_work|_eigensystem|_eigenvalues|_equilc|_equilr|_equilrc|_ftell|_fullsvd|_hqrd|_hqrdp|_invlower|_jumble|_lefteigensystem|_lowertriangle|_lud|_lud_la|_luinv|_lusolve|_matexpsym|_matlogsym|_matpowersym|_mprobit_outer_prod|_mprobit_quadrature|_mprobit_quadrature_eval|_mprobit_quadrature_m|_mprobit_select|_mprobit_simulator|_mprobit_simulator_case_g|_mprobit_simulator_lk|_mprobit_simulator_m|_mprobit_simulator_mi|_mprobit_validate_choice|_mprobit_weights_roots_laguerre|_perhapsequilc|_perhapsequilr|_perhapsequilrc|_pinv|_qrinv|_qrsolve|_rowswap|_solvelower|_solveupper|_sort|_svd|_svdsv|_svsolve|_svy_design|_svy_group_sum|_svy_identify|_svy_mean|_svy_mean_post|_svy_mean_std|_svy_mean_stdpost|_svy_over_expand|_svy_over_sizes|_svy_post_sizes|_svy_ratio|_svy_ratio_post|_svy_ratio_std|_svy_ratio_stdpost|_svy_srs_variance|_svy_srssub_variance|_svy_std_sizes|_svy_total|_svy_total_post|_svy_variance|_symeigen_work|_symeigensystem|_symeigenvalues|_symmatfunc_work|_uppertriangle|_xtm_beta|_xtm_blup|_xtm_blup_save|_xtm_blup_save_u|_xtm_blup_u|_xtm_cleanup|_xtm_covtype|_xtm_de_th_u|_xtm_delta_to_theta|_xtm_det_upper|_xtm_em_get_rij|_xtm_em_get_uij|_xtm_em_iter|_xtm_em_iter_u|_xtm_em_solve|_xtm_fact_expand|_xtm_ga_th_u|_xtm_gamma_to_theta|_xtm_get_delta|_xtm_get_delta_u|_xtm_invert_R|_xtm_logdetr00|_xtm_logdetr00_u|_xtm_matexp|_xtm_matlog|_xtm_mixed_ll|_xtm_mixed_ll_u|_xtm_mixed_ll_uu|_xtm_mk_eqs|_xtm_ml_eqlist|_xtm_ml_eqlist_wrk|_xtm_setup|_xtm_start|_xtm_start_collapse|_xtm_start_u|_xtm_th_de_u|_xtm_th_ga_u|_xtm_theta_to_delta|_xtm_theta_to_gamma|acos|acosh|aggregate|array|asin|asinh|assert|asserteq|atan|atanh|blockdiag|boolean|break|byte|case|cat|catch|chdir|cholesky|cholinv|cholsolve|class|cloglog|collate|colmax|colmin|colscalefactors|colshape|colvector|complex|cond|const|continue|convolve|convolveslowly|Corr|correlation|Corrslowly|corruppercase|cosh|deconvolve|default|delegate|delete|designmatrix|det|dettriangular|diag|diag0cnt|do|double|dsign|e|editmissing|edittoint|edittointtol|edittozero|edittozerotol|editvalue|eigensystem|eigenvalues|else|eltypedef|end|enum|explicit|export|external|fft|fileexists|findfile|float|for|friend|ftell|ftfreqs|ftpad|ftperiodogram|ftretime|ftunwrap|ftwrap|fullsdiag|fullsvd|function|gamma|global|goto|helloworld|Hilbert|hqrd|hqrdmultq|hqrdmultq1t|hqrdp|hqrdq|hqrdq1|hqrdr|hqrdr1|if|inline|int|invcloglog|invfft|invHilbert|invlogit|invlower|invorder|invslowfft|invslowft|invvech|isdiagonal|jumble|lefteigensystem|local|log10|logit|long|lowertriangle|lud|luinv|lusolve|makesymmetric|mat_norm|mata|matexpsym|matlogsym|matpowersym|matrix|max|mean|meanvariance|min|mkdir|mmat_|mmat_describe|mmat_expandlist|mmat_readerror|mmat_save|mmat_use|mmat_writeerror|namespace|new|norm|NULL|numeric|operator|orgtypedef|panelsetup|panelsetup_u|panelstats|panelsubmatrix|panelsubview|pathlist|pathsubsysdir|pi|pinv|pointer|polyadd|polyadd_expand|polyderiv|polydiv|polyeval|polyinteg|polymorphic|polymult|polyroots|polysolve|polytrim|pragma|private|protected|public|qrd|qrdp|qrinv|qrsolve|quad|quadcorrelation|quadmeanvariance|quadrant|quadvariance|range|rangen|rank|rank_from_singular_values|real|return|revorder|rmdir|rowmax|rowmin|rowscalefactors|rowvector|scalar|scalar_norm|short|sign|signed|sinh|sizeof|slowfft|slowft|solve_tol|solve_tolscale|solvelower|solveupper|sort|spline3|spline3eval|splineeval|st_islmname|static|string|struct|super|svd|svdsv|svsolve|switch|symeigensystem|symeigenvalues|tanh|template|this|throw|Toeplitz|trace|trace_prod|transmorphic|transposeonly|try|typedef|typename|union|uniqrows|unitcircle|unorder|unsigned|uppertriangle|using|Vandermonde|variance|vec|vec_norm|vech|vector|version|virtual|void|volatile|while)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:_all|_column|_cons|_dta|_dup|_merge|_n|_newline|_pi|_rc|creturn|c\(adopath\)|c\(adosize\)|c\(ALPHA\)|c\(born_date\)|c\(byteorder\)|c\(changed\)|c\(checksum\)|c\(cmdlen\)|c\(console\)|c\(copycolor\)|c\(current_date\)|c\(current_time\)|c\(dirsep\)|c\(dockable\)|c\(dockingguides\)|c\(dp\)|c\(epsdouble\)|c\(epsfloat\)|c\(filedate\)|c\(filename\)|c\(flavor\)|c\(graphics\)|c\(httpproxy\)|c\(httpproxyauth\)|c\(httpproxyhost\)|c\(httpproxyport\)|c\(httpproxypw\)|c\(httpproxyuser\)|c\(k\)|c\(level\)|c\(linegap\)|c\(linesize\)|c\(locksplitters\)|c\(logtype\)|c\(machine_type\)|c\(macrolen\)|c\(matacache\)|c\(matafavor\)|c\(matalibs\)|c\(matalnum\)|c\(matamofirst\)|c\(mataoptimize\)|c\(matastrict\)|c\(matsize\)|c\(max_cmdlen\)|c\(max_k_current\)|c\(max_k_theory\)|c\(max_macrolen\)|c\(max_matsize\)|c\(max_N_current\)|c\(max_N_theory\)|c\(max_width_current\)|c\(max_width_theory\)|c\(maxbyte\)|c\(maxdb\)|c\(maxdouble\)|c\(maxfloat\)|c\(maxint\)|c\(maxiter\)|c\(maxlong\)|c\(maxstrvarlen\)|c\(maxvar\)|c\(memory\)|c\(min_matsize\)|c\(minbyte\)|c\(mindouble\)|c\(minfloat\)|c\(minint\)|c\(minlong\)|c\(mode\)|c\(Mons\)|c\(Months\)|c\(more\)|c\(N\)|c\(namelen\)|c\(os\)|c\(osdtl\)|c\(pagesize\)|c\(persistfv\)|c\(persistvtopic\)|c\(pi\)|c\(printcolor\)|c\(pwd\)|c\(rc\)|c\(reventries\)|c\(rmsg_time\)|c\(rmsg\)|c\(scheme\)|c\(scrollbufsize\)|c\(SE\)|c\(searchdefault\)|c\(seed\)|c\(stata_version\)|c\(sysdir_base\)|c\(sysdir_oldplace\)|c\(sysdir_personal\)|c\(sysdir_plus\)|c\(sysdir_site\)|c\(sysdir_stata\)|c\(sysdir_updates\)|c\(timeout1\)|c\(timeout2\)|c\(trace\)|c\(tracedepth\)|c\(traceexpand\)|c\(tracehilite\)|c\(traceindent\)|c\(tracenumber\)|c\(tracesep\)|c\(type\)|c\(update_interval\)|c\(update_prompt\)|c\(update_query\)|c\(varabbrev\)|c\(varlabelpos\)|c\(version\)|c\(virtual\)|c\(Wdays\)|c\(Weekdays\)|c\(width\)|c\(xptheme\))\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:adosize|checksum|copycolor|dockable|dockingguides|dp|graphics|httpproxy|httpproxyauth|httpproxyhost|httpproxyport|httpproxypw|httpproxyuser|level|linegap|linesize|locksplitters|logtype|matacache|matafavor|matalibs|matalnum|matamofirst|mataoptimize|matastrict|matsize|maxdb|maxiter|maxvar|memory|more|pagesize|persistfv|persistvtopic|printcolor|reventries|rmsg|scheme|scrollbufsize|searchdefault|seed|timeout1|timeout2|trace|tracedepth|traceexpand|tracehilite|traceindent|tracenumber|tracesep|type|update_interval|update_prompt|update_query|varabbrev|varlabelpos|version|virtual|xptheme)\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^(?:all|BASE|coleq|colfullnames|coln|colnames|constraint|data|dir|display|environment|format|l|label|length|list|nobreak|nofail|permname|PERSONAL|piece|PLUS|quoted|row|roweq|rowfullnames|rown|rownames|SITE|sortedby|STATA|strict|sysdir|tempfile|tempvar|tsnorm|UPDATES|value|variable)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$[A-Za-z0-9_?{}!]+/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if(this.str[0] == '`' && this.str[1] == '"' && this.hl('`"', 'dsNormal')) continue;
        if((m = /^`.*?'/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {this._commentar1();continue;}
        if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {this._commentar2();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
        if((m = /^program define/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^end/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._commentar1 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._commentar2 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._comment2 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._base = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\$[A-Za-z0-9_?{}!]+/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
