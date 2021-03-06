CREATE OR REPLACE VIEW VIEW_PFD_SFHJL AS
SELECT GCDJH,JLWBDH,ZDRQ, KDSJ,SHRMC,SPRQ,SPXX02,FXJE,GSXX01,
            SPXX04,FXSL,PFDJ,PFJE, BCZLSL,SUM(CKSL) CKSL, WJZLSL,
            GCSCSL,WTZLSL,PFDI01,BZJE,BJZDJ,BZJHJ,BCFHBZJ,WFBZJ,GHSL 
       FROM (SELECT  A.GCDJH,A.JLWBDH,A.PFD29 SHRMC,A.GSXX01,
                     TO_CHAR(C.CZRQ, 'YYYY-MM-DD HH24:MI:SS') CZRQ,
                     TO_CHAR(A.PFD04, 'YYYY-MM-DD HH24:MI:SS') ZDRQ,
                     TO_CHAR(A.PFD04, 'YYYY-MM-DD HH24:MI:SS') KDSJ,
                     TO_CHAR(A.PFD30, 'YYYY-MM-DD HH24:MI:SS') SPRQ,
                     S.SPXX02,S.SPXX04,B.PFDI05 FXSL,NVL(C.SSFSL,0) CKSL,
                     B.PFDI02 PFDJ,B.PFDI06 PFJE,B.GCJZLSL BCZLSL, (B.PFDI05 - B.PFDI09)* B.PFDI02 FXJE,
                     (B.PFDI05 - B.GCJZLSL - B.GCSCSL-B.PFDI09) WJZLSL,
                     B.GCSCSL,NVL(B.WTZLSL,0) WTZLSL,B.PFDI01,NVL(B.BZJE,0) BZJE,
                     NVL(B.BZJE/B.PFDI05,0) BJZDJ,B.PFDI06+NVL(B.BZJE,0) BZJHJ,
                     NVL((SELECT CXJE FROM KHBZJSP WHERE PFDI01=B.PFDI01 AND GSXX01=A.GSXX01),0) BCFHBZJ,
                     NVL((SELECT BZJE FROM KHBZJSP WHERE PFDI01=B.PFDI01 AND GSXX01=A.GSXX01),0)-
                     NVL((SELECT CXJE FROM KHBZJSP WHERE PFDI01=B.PFDI01 AND GSXX01=A.GSXX01),0) WFBZJ,
                     NVL((SELECT GHSL FROM KHBZJSP WHERE PFDI01=B.PFDI01 AND GSXX01=A.GSXX01),0) GHSL
               FROM  PFD A, PFDITEM B, SPXX S, SFHJL C
              WHERE A.PFD01 = B.PFD01
                AND A.GSXX01 = B.GSXX01
                AND B.SPXX01 = S.SPXX01
                AND B.GSXX01 = C.GSXX01(+)
                AND 8 = C.DJLX(+)
                AND (CASE WHEN B.PFDI05 < 0 THEN 0 ELSE 1 END) = C.CZLX(+)
                AND B.PFD01 = C.DJHM(+)
                AND B.PFDI01 = C.THDH(+)
                AND B.SPXX01 = C.SPXX01(+)
                AND B.CK01 = C.CK01(+)
                AND B.BM01 = C.CGBM01(+)
                AND B.WLDW01 = C.WLDW01(+)
                AND B.PFDI21 = C.SPSX(+)
                AND A.GCDJH IS NOT NULL
                AND A.PFD30 IS NOT NULL)
                --AND B.PFDI12 is not null
              --  AND B.PFDI05 - B.GCJZLSL - B.GCSCSL-B.PFDI09>0)
    GROUP BY GCDJH,JLWBDH,ZDRQ,KDSJ,SHRMC,SPRQ,SPXX02,SPXX04,FXSL,FXJE,
             PFDJ,PFJE, BCZLSL, WJZLSL,GCSCSL,WTZLSL,PFDI01,BZJE,
             BJZDJ,BZJHJ,BCFHBZJ,WFBZJ,GSXX01,GHSL;
