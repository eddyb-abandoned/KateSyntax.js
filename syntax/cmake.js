KateSyntax.langs.cmake.syntax = {
    default: 'cmake_normalText',
    cmake_normalText: function cmake_normalText(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^(?:add_custom_command|add_custom_target|add_definitions|add_dependencies|add_executable|add_library|add_subdirectory|add_test|aux_source_directory|break|build_command|build_name|cmake_minimum_required|cmake_policy|configure_file|create_test_sourcelist|define_property|else|elseif|enable_language|enable_testing|endforeach|endfunction|endif|endmacro|endwhile|exec_program|execute_process|export|export_library_dependencies|file|find_file|find_library|find_package|find_path|find_program|fltk_wrap_ui|foreach|function|get_cmake_property|get_directory_property|get_filename_component|get_property|get_source_file_property|get_target_property|get_test_property|if|include|include_directories|include_external_msproject|include_regular_expression|install|install_files|install_programs|install_targets|link_directories|link_libraries|list|load_cache|load_command|macro|make_directory|mark_as_advanced|math|message|option|output_required_files|project|qt_wrap_cpp|qt_wrap_ui|remove|remove_definitions|return|separate_arguments|set|set_directory_properties|set_property|set_source_files_properties|set_target_properties|set_tests_properties|site_name|source_group|string|subdir_depends|subdirs|target_link_libraries|try_compile|try_run|unset|use_mangled_mesa|utility_source|variable_requires|variable_watch|while|write_file)\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.cmake_commandArgs())return this.pop(), m-1;continue;}
            if((m = /^(?:itk_wrap_tcl|vtk_make_instantiator|vtk_wrap_java|vtk_wrap_python|vtk_wrap_tcl)\b/i.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^#\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^#\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.cmake_comment())return this.pop(), m-1;continue;}
            if((m = /^\$ENV\{\s*\w+\s*\}/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\$\{\s*\w+\s*\}/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^\w+\s*(?=\()/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {if(m = this.cmake_macroArgs())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    cmake_detectVariables: function cmake_detectVariables(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\$ENV\{\s*\w+\s*\}/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\$\{\s*\w+\s*\}/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    cmake_commandArgs: function cmake_commandArgs(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:A|ABSOLUTE|AFTER|ALL|ALPHABET|AND|APPEND|ARCHIVE|ARGS|ASCII|AUTHOR_WARNING|B|BEFORE|BRIEF_DOCS|BUNDLE|CACHE|CLEAR|CMAKE_FIND_ROOT_PATH_BOTH|CMAKE_FLAGS|CODE|COMMAND|COMMAND_NAME|COMMENT|COMPARE|COMPILE_DEFINITIONS|COMPILE_OUTPUT_VARIABLE|COMPILE_RESULT_VAR|COMPONENT|COMPONENTS|CONFIGS|CONFIGURATION|CONFIGURATIONS|CONFIGURE|COPYONLY|COPY_FILE|DEFINED|DEFINITION|DEPENDS|DESTINATION|DIRECTORY|DIRECTORY_PERMISSIONS|DOC|DOWNLOAD|ENV|EQUAL|ERROR_FILE|ERROR_QUIET|ERROR_STRIP_TRAILING_WHITESPACE|ERROR_VARIABLE|ESCAPE_QUOTES|EXACT|EXCLUDE|EXCLUDE_FROM_ALL|EXISTS|EXPORT|EXPR|EXT|EXTRA_INCLUDE|FATAL_ERROR|FILE|FILES|FILES_MATCHING|FILE_PERMISSIONS|FIND|FOLLOW_SYMLINKS|FORCE|FRAMEWORK|FULL_DOCS|FUNCTION|GET|GLOB|GLOB_RECURSE|GREATER|GROUP_EXECUTE|GROUP_READ|HEX|HINTS|IMPLICIT_DEPENDS|IMPORTED|IN|INCLUDE_INTERNALS|INHERITED|INPUT_FILE|INSERT|IS_ABSOLUTE|IS_DIRECTORY|IS_NEWER_THAN|IS_SYMLINK|ITEMS|LENGTH|LENGTH_MAXIMUM|LENGTH_MINIMUM|LESS|LIBRARY|LIMIT|LIMIT_COUNT|LIMIT_INPUT|LIMIT_OUTPUT|LINK_INTERFACE_LIBRARIES|LISTS|LOG|MACOSX_BUNDLE|MAIN_DEPENDENCY|MAKE_DIRECTORY|MATCH|MATCHALL|MATCHES|MODULE|NAME|NAMELINK_ONLY|NAMELINK_SKIP|NAMES|NAMESPACE|NAME_WE|NEW|NEWLINE_CONSUME|NOT|NOTEQUAL|NO_CMAKE_BUILDS_PATH|NO_CMAKE_ENVIRONMENT_PATH|NO_CMAKE_FIND_ROOT_PATH|NO_CMAKE_PACKAGE_REGISTRY|NO_CMAKE_PATH|NO_CMAKE_SYSTEM_PATH|NO_DEFAULT_PATH|NO_HEX_CONVERSION|NO_MODULE|NO_POLICY_SCOPE|NO_SOURCE_PERMISSIONS|NO_SYSTEM_ENVIRONMENT_PATH|OFFSET|OLD|ONLY_CMAKE_FIND_ROOT_PATH|OPTIONAL|OR|OUTPUT|OUTPUT_DIRECTORY|OUTPUT_FILE|OUTPUT_QUIET|OUTPUT_STRIP_TRAILING_WHITESPACE|OUTPUT_VARIABLE|OWNER_EXECUTE|OWNER_READ|OWNER_WRITE|PACKAGE|PARENT_SCOPE|PATH|PATHS|PATH_SUFFIXES|PATH_TO_MESA|PATTERN|PERMISSIONS|POLICY|POP|POST_BUILD|PREORDER|PRE_BUILD|PRE_LINK|PRIVATE_HEADER|PROGRAM|PROGRAMS|PROGRAM_ARGS|PROJECT_NAME|PROPERTIES|PROPERTY|PUBLIC_HEADER|PUSH|QUIET|RANDOM|RANDOM_SEED|RANGE|READ|READ_WITH_PREFIX|REALPATH|REGEX|REGULAR_EXPRESSION|RELATIVE|RELATIVE_PATH|REMOVE|REMOVE_AT|REMOVE_DUPLICATES|REMOVE_ITEM|REMOVE_RECURSE|RENAME|REPLACE|REQUIRED|REQUIRED_VARIABLE1|REQUIRED_VARIABLE2|RESOURCE|RESULT_VAR|RESULT_VARIABLE|RETURN_VALUE|REVERSE|RUNTIME|RUNTIME_DIRECTORY|RUN_OUTPUT_VARIABLE|RUN_RESULT_VAR|SCRIPT|SEND_ERROR|SET|SHARED|SORT|SOURCE|SOURCES|STATIC|STATUS|STREQUAL|STRGREATER|STRINGS|STRIP|STRLESS|SUBSTRING|SYSTEM|TARGET|TARGETS|TEST|TEST_VARIABLE|TIMEOUT|TOLOWER|TOUPPER|TO_CMAKE_PATH|TO_NATIVE_PATH|USE_SOURCE_PERMISSIONS|VALUE|VAR|VAR2|VARIABLE|VERBATIM|VERSION|VERSION_EQUAL|VERSION_GREATER|VERSION_LESS|WARNING|WIN32|WORKING_DIRECTORY|WRITE)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^(?:GLOBAL|INTERNAL)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^(?:ABSTRACT|ADDITIONAL_MAKE_CLEAN_FILES|ADVANCED|ALLOW_DUPLICATE_CUSTOM_TARGETS|ARCHIVE_OUTPUT_DIRECTORY|ARCHIVE_OUTPUT_NAME|ATTACHED_FILES|ATTACHED_FILES_ON_FAIL|BUILD_WITH_INSTALL_RPATH|CACHE_VARIABLES|CLEAN_NO_CUSTOM|COMPILE_DEFINITIONS|COMPILE_FLAGS|COST|DEBUG_CONFIGURATIONS|DEBUG_POSTFIX|DEFINE_SYMBOL|DEFINITIONS|DEPENDS|DISABLED_FEATURES|ENABLED_FEATURES|ENABLED_LANGUAGES|ENABLE_EXPORTS|ENVIRONMENT|EXCLUDE_FROM_ALL|EXTERNAL_OBJECT|EchoString|FAIL_REGULAR_EXPRESSION|FIND_LIBRARY_USE_LIB64_PATHS|FIND_LIBRARY_USE_OPENBSD_VERSIONING|FRAMEWORK|Fortran_MODULE_DIRECTORY|GENERATED|GENERATOR_FILE_NAME|GLOBAL_DEPENDS_DEBUG_MODE|GLOBAL_DEPENDS_NO_CYCLES|HAS_CXX|HEADER_FILE_ONLY|HELPSTRING|IMPLICIT_DEPENDS_INCLUDE_TRANSFORM|IMPORTED|IMPORTED_CONFIGURATIONS|IMPORTED_IMPLIB|IMPORTED_LINK_DEPENDENT_LIBRARIES|IMPORTED_LINK_INTERFACE_LANGUAGES|IMPORTED_LINK_INTERFACE_LIBRARIES|IMPORTED_LINK_INTERFACE_MULTIPLICITY|IMPORTED_LOCATION|IMPORTED_SONAME|IMPORT_PREFIX|IMPORT_SUFFIX|INCLUDE_DIRECTORIES|INCLUDE_REGULAR_EXPRESSION|INSTALL_NAME_DIR|INSTALL_RPATH|INSTALL_RPATH_USE_LINK_PATH|INTERPROCEDURAL_OPTIMIZATION|IN_TRY_COMPILE|KEEP_EXTENSION|LABELS|LANGUAGE|LIBRARY_OUTPUT_DIRECTORY|LIBRARY_OUTPUT_NAME|LINKER_LANGUAGE|LINK_DIRECTORIES|LINK_FLAGS|LINK_INTERFACE_LIBRARIES|LINK_INTERFACE_MULTIPLICITY|LINK_SEARCH_END_STATIC|LISTFILE_STACK|LOCATION|MACOSX_BUNDLE|MACOSX_BUNDLE_INFO_PLIST|MACOSX_FRAMEWORK_INFO_PLIST|MACOSX_PACKAGE_LOCATION|MACROS|MEASUREMENT|MODIFIED|OBJECT_DEPENDS|OBJECT_OUTPUTS|OSX_ARCHITECTURES|OUTPUT_NAME|PACKAGES_FOUND|PACKAGES_NOT_FOUND|PARENT_DIRECTORY|PASS_REGULAR_EXPRESSION|POST_INSTALL_SCRIPT|PREFIX|PRE_INSTALL_SCRIPT|PRIVATE_HEADER|PROCESSORS|PROJECT_LABEL|PUBLIC_HEADER|REPORT_UNDEFINED_PROPERTIES|REQUIRED_FILES|RESOURCE|RULE_LAUNCH_COMPILE|RULE_LAUNCH_CUSTOM|RULE_LAUNCH_LINK|RULE_MESSAGES|RUNTIME_OUTPUT_DIRECTORY|RUNTIME_OUTPUT_NAME|RUN_SERIAL|SKIP_BUILD_RPATH|SOURCES|SOVERSION|STATIC_LIBRARY_FLAGS|STRINGS|SUFFIX|SYMBOLIC|TARGET_ARCHIVES_MAY_BE_SHARED_LIBS|TARGET_SUPPORTS_SHARED_LIBS|TEST_INCLUDE_FILE|TIMEOUT|TYPE|VALUE|VARIABLES|VERSION|VS_KEYWORD|VS_SCC_LOCALPATH|VS_SCC_PROJECTNAME|VS_SCC_PROVIDER|WILL_FAIL|WIN32_EXECUTABLE|WRAP_EXCLUDE|__CMAKE_DELETE_CACHE_CHANGE_VARS_)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^(?:COMMANDS|DEFINITION)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == ')' && this.hl(')', 'dsNormal')) return this.pop();
            if((m = /^\\"/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.cmake_string())return this.pop(), m-1;continue;}
            if((m = /^#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^\$ENV\{\s*\w+\s*\}/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\$\{\s*\w+\s*\}/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    cmake_macroArgs: function cmake_macroArgs(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ')' && this.hl(')', 'dsNormal')) return this.pop();
            if((m = /^\\"/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.cmake_string())return this.pop(), m-1;continue;}
            if((m = /^#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^\$ENV\{\s*\w+\s*\}/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\$\{\s*\w+\s*\}/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    cmake_comment: function cmake_comment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    cmake_string: function cmake_string(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^"(?=[ );]|(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsString')) return this.pop();
            if((m = /^\\["$n\\]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\$ENV\{\s*\w+\s*\}/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\$\{\s*\w+\s*\}/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            this.hl(this.str[0], 'dsString');
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
    }
};
