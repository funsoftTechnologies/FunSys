CREATE SEQUENCE id_seq
    INCREMENT BY 1
    START WITH 1;

CREATE TABLE ARTICLE (
                         ID NUMBER NOT NULL,
                         NAME VARCHAR2(50) NOT NULL,
                         PRICE NUMBER NOT NULL,
                         SIGN VARCHAR2(50) NOT NULL
);

INSERT INTO "ARTICLE" (id, NAME, PRICE, SIGN) VALUES(id_seq.nextval,'Lait Bio',0.91, 'Lidl');
INSERT INTO "ARTICLE" (id, NAME, PRICE, SIGN) VALUES(id_seq.nextval,'Pack Volvic',2.76, 'Lidl');