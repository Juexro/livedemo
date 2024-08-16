import React, { useEffect, useRef } from 'react';
import { iecst, autocomplete } from 'codemirror-iecst';
import { basicSetup, EditorView } from 'codemirror';
import { EditorState } from '@codemirror/state';

const example = `TYPE
  ARRY1 : ARRAY [0..1] OF BYTE;
  ARRY2 : ARRAY [0..1] OF WORD;
  Un_DWord : UNION
    nDWord : DWORD;
    nWord : ARRY2;
  END_UNION;
  Un_Word : UNION
    nWord : WORD;
    nByte : ARRY1;
  END_UNION;
  ARRY3 : ARRAY [0..9] OF INT := [1,2,3,7(100)];
END_TYPE

PROGRAM ST_Union
  VAR
    Un_Word1 : Un_Word;
    Un_Dword1 : Un_DWord;
    nByte_Low : BYTE;
    nByte_High : BYTE;
    nWord_High : WORD;
    nWord_Low : WORD;
  END_VAR

  nByte_Low := 34;
  nByte_High := 12;
  Un_Word1.nByte[0] := nByte_Low;
  Un_Word1.nByte[1] := nByte_High;

  nWord_Low := 5678;
  nWord_High := 1234;
  Un_Dword1.nWord[0] := nWord_Low;
  Un_Dword1.nWord[1] := nWord_High;


  (*nByte_Low:=16#34;
  nByte_High:=16#12;
  Un_Word1.nByte[0]:=nByte_Low;
  Un_Word1.nByte[1]:=nByte_High;

  nWord_Low:=16#5678;
  nWord_High:=16#1234;
  Un_Dword1.nWord[0]:=nWord_Low;
  Un_Dword1.nWord[1]:=nWord_High;*)

END_PROGRAM

FUNCTION_BLOCK FB_ST_Add
  VAR_INPUT
    IN1 : INT;
    IN2 : INT;
  END_VAR
  VAR_OUTPUT
    OUT : INT;
  END_VAR

  OUT:=IN1+IN2;

END_FUNCTION_BLOCK

PROGRAM WSTRING_TEST
  VAR
    WS1 : WSTRING := "1234 €5";
    WS2 : WSTRING := "汉字";
    INT1 : INT;
    INT2 : INT;
    INT3 : INT;
    S1 : STRING := 'string@';
  END_VAR

  INT1 := LEN(WS2);
  INT2 := LEN(S1);
  INT3 := LEN(WS1);

END_PROGRAM

PROGRAM LTIME_Test
  VAR
    time1 : LTIME := LT#1d23h57m8s155ms446us337ns;
    time2 : LTIME := LT#1d23h57m8s155ms441us337ns;
    time3 : LTIME;
    time4 : LTIME;
    time5 : LTIME;
  END_VAR

  (*time1:= LT#1d23h57m8s155ms446us337ns;
  time2:= LT#2d3h57m8s155ms446us337ns;*)
  time3:=time1+time2;
  time4:=time1-time2;
  time5:=time1 * 3;

END_PROGRAM

PROGRAM pointer_test
  VAR
    a : INT := 10;
    pa : POINTER TO INT;
    b : INT;
    c : INT;
    px : POINTER TO TIME;
    ppx : POINTER TO POINTER TO TIME;
    x : TIME := T#3s;
    y : TIME;
    yy : TIME;
    z : TIME;
    FB_ADD : FB_ST_Add;
    FBV : INT;
    pFB : POINTER TO FB_ST_ADD;
    PV : INT;
    DUT_ARRY3 : ARRY3;
  END_VAR

  pa := ADR(a);
  b := pa^;
  c := VAL(pa);

  px := ADR(x);
  y := px^;
  z := VAL(px);
  ppx := ADR(px);
  yy:=ppx^^;

  FB_ADD(IN1 := 10, IN2 := 20);

  PV := DUT_ARRY3[4];
  pFB := ADR(FB_ADD);
  FBV := pFB^.OUT;

END_PROGRAM


CONFIGURATION config

  RESOURCE resource1 ON PLC
    TASK MainTask(INTERVAL := T#2000ms, PRIORITY := 1);
    PROGRAM MainTask_10635_pointer_test_1 WITH MainTask : pointer_test;
    PROGRAM MainTask_10635_ST_Union_1 WITH MainTask : ST_Union;
    PROGRAM MainTask_10635_LTIME_Test_1 WITH MainTask : LTIME_Test;
    PROGRAM MainTask_10635_WSTRING_TEST_1 WITH MainTask : WSTRING_TEST;
  END_RESOURCE
END_CONFIGURATION
`;

const StructuredTextEditor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const state = EditorState.create({
      doc: example,
      extensions: [
        basicSetup,
        iecst(),
        autocomplete()
      ]
    });
    const editor = new EditorView({
      state,
      parent: editorRef.current as HTMLDivElement
    });
    return () => {
      editor.destroy();
    };
  }, []);
  
  return (
    <div ref={editorRef}></div>
  );
};

export default StructuredTextEditor;