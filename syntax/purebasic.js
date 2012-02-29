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
        if((m = /^\b(if)([\s]|$)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(endif)([\s]|$)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(while)([\s]|$)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(wend)([\s]|$)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(repeat)([\s]|$)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(until)([\s]|$)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(select)([\s]|$)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(endselect)([\s]|$)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(for|foreach)([\s]|$)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(next)([\s]|$)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(procedure|proceduredll)([.\s]|$)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(endprocedure)([\s]|$)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(structure)([\s]|$)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(endstructure)([\s]|$)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(interface)([\s]|$)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(endinterface)([\s]|$)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(enumeration)([\s]|$)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(endenumeration)([\s]|$)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(datasection)([\s]|$)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(enddatasection)([\s]|$)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(compilerif)([\s]|$)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(compilerendif)([\s]|$)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(compilerselect)([\s]|$)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(compilerendselect)([\s]|$)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:For|ForEach|To|Step|Next|Break|Continue|If|Else|ElseIf|EndIf|Debug|Repeat|Until|Select|Case|Default|EndSelect|While|Wend|End|Structure|EndStructure|Interface|EndInterface|Extends|DefType|Dim|Enumeration|EndEnumeration|Global|Procedure|EndProcedure|ProcedureReturn|Shared|Protected|Static|Declare|DataSection|EndDataSection|Data|Restore|Read|IncludeFile|XIncludeFile|IncludeBinary|IncludePath|CompilerIf|CompilerElse|CompilerEndIf|CompilerSelect|CompilerCase|CompilerDefault|CompilerEndSelect|ProcedureDLL|NewList|Goto|Gosub|Return|FakeReturn)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:Abs|ACos|ActivateGadget|ActivateRichEdit|ActivateWindow|Add3DArchive|AddBillboard|AddDate|AddElement|AddGadgetColumn|AddGadgetItem|AddKeyboardShortcut|AddMaterialLayer|AddPackFile|AddPackMemory|AddStatusBarField|AddSysTrayIcon|AdvancedGadgetEvents|AllocateMemory|AmbientColor|AnimateEntity|Asc|ASin|ATan|AvailableScreenMemory|BackColor|Base64Encoder|BillboardGroupLocate|BillboardGroupMaterial|BillboardGroupX|BillboardGroupY|BillboardGroupZ|BillboardHeight|BillboardLocate|BillboardWidth|BillboardX|BillboardY|BillboardZ|Bin|Blue|Box|ButtonGadget|ButtonImageGadget|CallCFunctionFast|CallCFunction|CallCOM|CallDX|CallFunctionFast|CallFunction|CameraBackColor|CameraFOV|CameraLocate|CameraLookAt|CameraProjection|CameraRange|CameraRenderMode|CameraX|CameraY|CameraZ|CatchImage|CatchSound|CatchSprite|CDAudioLength|CDAudioName|CDAudioStatus|CDAudioTrackLength|CDAudioTrackSeconds|CDAudioTracks|ChangeAlphaIntensity|ChangeAlphaIntensity|ChangeCurrentElement|ChangeGamma|ChangeListIconGadgetDisplay|ChangeRichEditOptions|ChangeSysTrayIcon|CheckBoxGadget|Chr|Circle|ClearBillboards|ClearClipboard|ClearConsole|ClearError|ClearGadgetItemList|ClearList|ClearScreen|ClipSprite|CloseConsole|CloseDatabase|CloseFile|CloseFont|CloseGadgetList|CloseHelp|CloseLibrary|CloseNetworkConnection|CloseNetworkServer|ClosePack|ClosePreferences|CloseRichEdit|CloseScreen|CloseSubMenu|CloseTreeGadgetNode|CloseWindow|ColorRequester|ComboBoxGadget|CompareMemory|CompareMemoryString|ConsoleColor|ConsoleCursor|ConsoleLocate|ConsoleTitle|ContainerGadget|CopyDirectory|CopyEntity|CopyFile|CopyImage|CopyLight|CopyMaterial|CopyMemory|CopyMemoryString|CopyMesh|CopySprite|CopyTexture|Cos|CountBillboards|CountGadgetItems|CountLibraryFunctions|CountList|CountMaterialLayers|CountRenderedTriangles|CountString|CountTreeGadgetNodeItems|CRC32Fingerprint|CreateBillboardGroup|CreateCamera|CreateDirectory|CreateEntity|CreateFile|CreateGadgetList|CreateImage|CreateLight|CreateMaterial|CreateMenu|CreateMesh|CreateNetworkServer|CreatePack|CreatePalette|CreateParticleEmitter|CreatePopupMenu|CreatePreferences|CreateSprite3D|CreateSprite|CreateStatusBar|CreateTerrain|CreateTexture|CreateThread|CreateToolBar|DatabaseColumnName|DatabaseColumns|DatabaseColumnType|DatabaseDriverDescription|DatabaseDriverName|DatabaseError|DatabaseQuery|DatabaseUpdate|Date|Day|DayOfWeek|DayOfYear|DefaultPrinter|Delay|DeleteDirectory|DeleteElement|DeleteFile|DESFingerprint|DetachMenu|DirectoryEntryAttributes|DirectoryEntryAttributes|DirectoryEntryName|DirectoryEntrySize|DisableGadget|DisableMaterialLighting|DisableMenuItem|DisableToolBarButton|DisASMCommand|DisplayAlphaSprite|DisplayAlphaSprite|DisplayPalette|DisplayPopupMenu|DisplayRGBFilter|DisplayShadowSprite|DisplayShadowSprite|DisplaySolidSprite|DisplaySprite3D|DisplaySprite|DisplayTranslucideSprite|DisplayTransparentSprite|DrawImage|DrawingBuffer|DrawingBufferPitch|DrawingBufferPixelFormat|DrawingFont|DrawingMode|DrawText|EditorGadget|EjectCDAudio|ElapsedMilliseconds|Ellipse|EndTimer|Engine3DFrameRate|EntityAnimationLength|EntityLocate|EntityMaterial|EntityMesh|EntityX|EntityY|EntityZ|Eof|EventGadgetID|EventlParam|EventMenuID|EventType|EventWindowID|EventwParam|ExamineDatabaseDrivers|ExamineDirectory|ExamineIPAddresses|ExamineJoystick|ExamineKeyboard|ExamineLibraryFunctions|ExamineMouse|ExamineScreenModes|ExplorerComboGadget|ExplorerListGadget|ExplorerTreeGadget|FileSeek|FileSize|FillArea|FindString|FindText|FirstDatabaseRow|FirstElement|FlipBuffers|Fog|FontDialog|FontID|FontRequester|FormatDate|Frame3DGadget|FreeBillboardGroup|FreeCamera|FreeEntity|FreeGadget|FreeImage|FreeLight|FreeMaterial|FreeMemory|FreeMenu|FreeMesh|FreeModule|FreeMovie|FreePalette|FreeParticleEmitter|FreeSound|FreeSprite3D|FreeSprite|FreeStatusBar|FreeTexture|FreeToolBar|FrontColor|GadgetHeight|GadgetID|GadgetItemID|GadgetToolTip|GadgetWidth|GadgetX|GadgetY|GetClipboardData|GetClipboardText|GetCurrentEIP|GetDatabaseFloat|GetDatabaseLong|GetDatabaseString|GetDisASMString|GetEntityAnimationTime|GetErrorAddress|GetErrorCounter|GetErrorDescription|GetErrorDLL|GetErrorLineNR|GetErrorModuleName|GetErrorNumber|GetErrorRegister|GetExtensionPart|GetFilePart|GetGadgetAttribute|GetGadgetItemAttribute|GetGadgetItemState|GetGadgetItemText|GetGadgetState|GetGadgetText|GetMaxTimerResolution|GetMenuItemState|GetMinTimerResolution|GetModulePosition|GetModuleRow|GetPaletteColor|GetPathPart|GetRichEditStyle|GetRichEditText|GetSelectedText|GetWindowTitle|GoToEIP|GrabImage|GrabSprite|Green|Hex|HideBillboardGroup|HideEntity|HideGadget|HideLight|HideMenu|HideParticleEmitter|HideWindow|Hostname|Hour|HyperLinkGadget|ImageDepth|ImageGadget|ImageHeight|ImageID|ImageOutput|ImageWidth|InitCDAudio|InitDatabase|InitEngine3D|InitJoystick|InitKeyboard|InitModule|InitMouse|InitMovie|InitNetwork|InitPalette|InitSound|InitSprite3D|InitSprite|Inkey|Input|InputRequester|InsertElement|Int|IPAddressField|IPAddressGadget|IPString|IPString|IsDatabase|IsDirectory|IsFile|IsFilename|IsFont|IsFunctionEntry|IsFunction|IsGadget|IsImage|IsLibrary|IsMenu|IsModule|IsMovie|IsPalette|IsScreenActive|IsSprite3D|IsSprite|IsStatusBar|IsSysTrayIcon|IsToolBar|IsWindow|JoystickAxisX|JoystickAxisY|JoystickButton|KeyboardInkey|KeyboardMode|KeyboardPushed|KeyboardReleased|KillThread|LastElement|LCase|Left|Len|LibraryFunctionAddress|LibraryFunctionName|LightColor|LightLocate|LightSpecularColor|Line|LineXY|ListIconGadget|ListIndex|ListViewGadget|LoadFont|LoadImage|LoadMesh|LoadModule|LoadMovie|LoadPalette|LoadSound|LoadSprite|LoadTexture|LoadWorld|Locate|Loc|Lof|Log10|Log|LSet|LTrim|MakeIPAddress|MakeIPAddress|MaterialAmbientColor|MaterialBlendingMode|MaterialDiffuseColor|MaterialFilteringMode|MaterialID|MaterialShadingMode|MaterialSpecularColor|MD5FileFingerprint|MD5Fingerprint|MDIGadget|MemoryStringLength|MenuBar|MenuHeight|MenuID|MenuItem|MenuTitle|MeshID|MessageRequester|Mid|Minute|ModuleVolume|Month|MouseButton|MouseDeltaX|MouseDeltaY|MouseLocate|MouseWheel|MouseX|MouseY|MoveBillboardGroup|MoveBillboard|MoveCamera|MoveEntity|MoveLight|MoveParticleEmitter|MoveWindow|MovieAudio|MovieHeight|MovieInfo|MovieLength|MovieSeek|MovieStatus|MovieWidth|NetworkClientEvent|NetworkClientID|NetworkServerEvent|NewPrinterPage|NextDatabaseDriver|NextDatabaseRow|NextDirectoryEntry|NextElement|NextIPAddress|NextLibraryFunction|NextPackFile|NextScreenMode|NextSelectedFileName|OffsetOf|OnErrorExit|OnErrorGosub|OnErrorGoto|OnErrorResume|OpenComPort|OpenConsole|OpenDatabase|OpenDatabaseRequester|OpenFile|OpenFileRequester|OpenGadgetList|OpenHelp|OpenLibrary|OpenNetworkConnection|OpenPack|OpenPreferences|OpenRichEdit|OpenScreen|OpenSubMenu|OpenTreeGadgetNode|OpenWindowedScreen|OpenWindow|OptionGadget|OSVersion|PackerCallback|PackFileSize|PackMemory|PanelGadget|ParseDate|ParticleColorFader|ParticleColorRange|ParticleEmissionRate|ParticleEmitterLocate|ParticleEmitterX|ParticleEmitterY|ParticleEmitterZ|ParticleMaterial|ParticleSize|ParticleTimeToLive|ParticleVelocity|PathRequester|PauseCDAudio|PauseMovie|PauseThread|PeekB|PeekF|PeekL|PeekS|PeekW|PlayCDAudio|PlayModule|PlayMovie|PlaySound|Plot|Point|PokeB|PokeF|PokeL|PokeS|PokeW|Pow|PreferenceComment|PreferenceGroup|PreviousDatabaseRow|PreviousElement|PrinterOutput|PrinterPageHeight|PrinterPageWidth|Print|PrintN|PrintRequester|ProgramParameter|ProgressBarGadget|Random|RandomSeed|ReadByte|ReadData|ReadFile|ReadFloat|ReadLong|ReadPreferenceFloat|ReadPreferenceLong|ReadPreferenceString|ReadString|ReadWord|ReAllocateMemory|ReceiveNetworkData|ReceiveNetworkFile|Red|ReleaseMouse|RemoveBillboard|RemoveGadgetColumn|RemoveGadgetItem|RemoveKeyboardShortcut|RemoveMaterialLayer|RemoveString|RemoveSysTrayIcon|RenameFile|RenderMovieFrame|RenderWorld|ReplaceString|ReplaceText|ResetList|ResizeBillboard|ResizeEntity|ResizeGadget|ResizeImage|ResizeMovie|ResizeParticleEmitter|ResizeRichEdit|ResizeWindow|ResumeCDAudio|ResumeMovie|ResumeThread|RGB|RichEditBackgroundColor|RichEditBackground|RichEditFontFace|RichEditFont|RichEditFontSize|RichEditHeight|RichEditID|RichEditIndex|RichEditLocate|RichEditMouseX|RichEditMouseY|RichEditOptions|RichEditParent|RichEditTextColor|RichEditWidth|RichEditX|RichEditY|Right|RotateBillboardGroup|RotateCamera|RotateEntity|RotateMaterial|RotateParticleEmitter|RotateSprite3D|Round|RSet|RTrim|RunProgram|SaveFileRequester|SaveImage|SaveSprite|ScaleEntity|ScaleMaterial|ScreenID|ScreenModeDepth|ScreenModeHeight|ScreenModeRefreshRate|ScreenModeWidth|ScreenOutput|ScrollAreaGadget|ScrollBarGadget|ScrollMaterial|Second|SelectedFilePattern|SelectedFontColor|SelectedFontName|SelectedFontSize|SelectedFontStyle|SelectedRange|SelectElement|SelectText|SendNetworkData|SendNetworkFile|SendNetworkString|SetClipboardData|SetClipboardText|SetEntityAnimationTime|SetErrorNumber|SetFrameRate|SetGadgetAttribute|SetGadgetFont|SetGadgetItemAttribute|SetGadgetItemState|SetGadgetItemText|SetGadgetState|SetGadgetText|Set\/GetWindowTitle|SetMenuItemState|SetMeshData|SetModulePosition|SetPaletteColor|SetRefreshRate|SetRichEditCallback|SetRichEditText|SetWindowCallback|SetWindowTitle|Sin|SizeOf|SkyBox|SkyDome|SortArray|SortList|SoundFrequency|SoundPan|SoundVolume|Space|SpinGadget|SplitterGadget|Sprite3DBlendingMode|Sprite3DQuality|SpriteCollision|SpriteDepth|SpriteHeight|SpriteOutput|SpritePixelCollision|SpriteWidth|Sqr|Start3D|StartDrawing|StartPrinting|StartSpecialFX|StartTimer|StatusBarIcon|StatusBarText|Stop3D|StopCDAudio|StopDrawing|StopModule|StopMovie|StopPrinting|StopSound|StopSpecialFX|StreamFileIn|StreamFileOut|StrF|StringField|StringGadget|Str|StrU|SysTrayIconToolTip|Tan|TerrainHeight|TextGadget|TextLength|TextureHeight|TextureID|TextureOutput|TextureWidth|ThreadPriority|ToolBarImageButton|ToolBarSeparator|ToolBarStandardButton|ToolBarToolTip|TrackBarGadget|TransformSprite3D|TransparentSpriteColor|TreeGadget|TreeGadgetItemNumber|Trim|UCase|UnpackMemory|UseBuffer|UseCDAudio|UseDatabase|UseDirectory|UseFile|UseFont|UseGadgetList|UseImage|UseJPEGImageDecoder|UseJPEGImageEncoder|UseMovie|UseOGGSoundDecoder|UsePalette|UsePNGImageDecoder|UsePNGImageEncoder|UseRichEdit|UseTGAImageDecoder|UseTIFFImageDecoder|UseWindow|ValF|Val|WaitThread|WaitWindowEvent|WebGadget|WindowEvent|WindowHeight|WindowID|WindowMouseX|WindowMouseY|WindowOutput|WindowWidth|WindowX|WindowY|WriteByte|WriteData|WriteFloat|WriteLong|WritePreferenceFloat|WritePreferenceLong|WritePreferenceString|WriteString|WriteStringN|WriteWord|Year|ZoomSprite3D)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^\#+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if((m = /^^\s*;+\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^^\s*;+\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == ';' && this.hl(';', 'dsComment')) {this._comment1();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        if(this.str[0] == '\n' && this.hl('\n', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._comment1 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n' && this.hl('\n', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
