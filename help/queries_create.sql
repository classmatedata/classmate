-- Database: classmatedata

-- DROP DATABASE IF EXISTS classmatedata;

-- CREATE DATABASE classmatedata
--     WITH
--     OWNER = postgres
--     ENCODING = 'UTF8'
--     LC_COLLATE = 'Hebrew_Israel.1255'
--     LC_CTYPE = 'Hebrew_Israel.1255'
--     LOCALE_PROVIDER = 'libc'
--     TABLESPACE = pg_default
--     CONNECTION LIMIT = -1
--     IS_TEMPLATE = False;


-- Table: public.lang

DROP TABLE IF EXISTS public.lang;

CREATE TABLE IF NOT EXISTS public.lang
(
    langcode character(2) COLLATE pg_catalog."default" NOT NULL,
    langname character varying(15) COLLATE pg_catalog."default" NOT NULL,
    langdir character(3) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT lang_pkey PRIMARY KEY (langcode)
)



-- Table: public.texts

CREATE SEQUENCE IF NOT EXISTS public.texts_textid_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.texts_textid_seq
    OWNER TO postgres;


DROP TABLE IF EXISTS public.texts;

CREATE TABLE IF NOT EXISTS public.texts
(
    textid integer NOT NULL,
    htmlidentifiercode character varying(40) COLLATE pg_catalog."default" ,
    CONSTRAINT texts_pkey PRIMARY KEY (textid)
)



-- Table: public.textBylang


-- DROP TABLE IF EXISTS public.textbylang;

CREATE TABLE IF NOT EXISTS public.textbylang
(
    tblid bigserial NOT NULL ,
    langcode character(2) COLLATE pg_catalog."default" NOT NULL,
    htmltext character varying(100) COLLATE pg_catalog."default" NOT NULL,
    textid integer,
    CONSTRAINT dictionarytexts_pkey PRIMARY KEY (tblid)
)




-- Table: public.classmategendercode

DROP TABLE IF EXISTS public.classmategendercode;

CREATE TABLE IF NOT EXISTS public.classmategendercode
(
    gendercode character(1) COLLATE pg_catalog."default" NOT NULL,
    textid integer NOT NULL,
    CONSTRAINT gendercode_pkey PRIMARY KEY (gendercode)
)




-- Table: public.classmate

DROP TABLE IF EXISTS public.classmate;

CREATE TABLE IF NOT EXISTS public.classmate
(
    userid bigserial  NOT NULL ,
    phone character varying(20) COLLATE pg_catalog."default" NOT NULL,
    languicode character(2) COLLATE pg_catalog."default" NOT NULL,
    firstname character varying(20) COLLATE pg_catalog."default" NOT NULL,
    lastname character varying(20) COLLATE pg_catalog."default" NOT NULL,
    classmategendercode character(1) COLLATE pg_catalog."default",
    CONSTRAINT classmate_pkey PRIMARY KEY (userid),
    CONSTRAINT classmate_gendercode_fkey FOREIGN KEY (classmategendercode)
        REFERENCES public.classmategendercode (gendercode) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT classmateuser_languicode_fkey FOREIGN KEY (languicode)
        REFERENCES public.lang (langcode) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)



-- Table: public.classmateadmin

DROP TABLE IF EXISTS public.classmateadmin;

CREATE TABLE IF NOT EXISTS public.classmateadmin
(
    userid bigint NOT NULL,
    CONSTRAINT classmateuseradmin_pkey PRIMARY KEY (userid),
    CONSTRAINT classmateuseradmin_userid_fkey FOREIGN KEY (userid)
        REFERENCES public.classmate (userid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)



-- Table: public.classmateteacher

DROP TABLE IF EXISTS public.classmateteacher;

CREATE TABLE IF NOT EXISTS public.classmateteacher
(
    userid bigint NOT NULL,
    hourstovolunteer smallint NOT NULL,
    CONSTRAINT classmateteacher_pkey PRIMARY KEY (userid),
    CONSTRAINT classmateteacher_userid_fkey FOREIGN KEY (userid)
        REFERENCES public.classmate (userid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)



 -- Table: public.classmatespokenlang

DROP TABLE IF EXISTS public.classmatespokenlang;

CREATE TABLE IF NOT EXISTS public.classmatespokenlang
(
    userid bigint NOT NULL,
    langcode character(2) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT userspokenlang_pkey PRIMARY KEY (userid, langcode),
    CONSTRAINT userapokenlang_langcode_fkey FOREIGN KEY (langcode)
        REFERENCES public.lang (langcode) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT userspokenlang_userid_fkey FOREIGN KEY (userid)
        REFERENCES public.classmate (userid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)




-- Table: public.courses

DROP TABLE IF EXISTS public.courses;

CREATE TABLE IF NOT EXISTS public.courses
(
    courseid serial NOT NULL,
    textId integer,
    CONSTRAINT courses_pkey PRIMARY KEY (courseid)
)



 -- Table: public.coursetopics

DROP TABLE IF EXISTS public.coursetopics;

CREATE TABLE IF NOT EXISTS public.coursetopics
(
    topicid serial NOT NULL,
    courseid integer NOT NULL,
    textid integer,
    CONSTRAINT coursetopics_pkey PRIMARY KEY (topicid),
    CONSTRAINT coursetopics_courseid_fkey FOREIGN KEY (courseid)
        REFERENCES public.courses (courseid) MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
        NOT VALID,
    CONSTRAINT coursetopics_textId_fkey FOREIGN KEY (textId)
        REFERENCES public.texts (textid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)





-- Table: public.teachercourses

DROP TABLE IF EXISTS public.teachercourses;

CREATE TABLE IF NOT EXISTS public.teachercourses
(
    teacherid bigint NOT NULL,
    courseid bigint NOT NULL,
    CONSTRAINT teachercourses_pkey PRIMARY KEY (teacherid, courseid),
    CONSTRAINT teachercourses_courseid_fkey FOREIGN KEY (courseid)
        REFERENCES public.courses (courseid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT teachercourses_teacherid_fkey FOREIGN KEY (teacherid)
        REFERENCES public.classmateteacher (userid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)




-- Table: public.teacherschedule

DROP TABLE IF EXISTS public.teacherschedule;

CREATE TABLE IF NOT EXISTS public.teacherschedule
(
    scheduleid bigserial NOT NULL  ,
    teacherid bigint NOT NULL,
    weekday smallint NOT NULL,
    hourstart smallint NOT NULL,
    hourend smallint NOT NULL,
    canteach boolean NOT NULL,
    startdate timestamp with time zone DEFAULT now(),
    enddate timestamp with time zone,
    CONSTRAINT teacherschedule_pkey PRIMARY KEY (scheduleid),
    CONSTRAINT teacherschedule_teacherid_fkey FOREIGN KEY (teacherid)
        REFERENCES public.classmateteacher (userid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)






-- Table: public.feedback

DROP TABLE IF EXISTS public.feedback;

CREATE TABLE IF NOT EXISTS public.feedback
(
    feedbackid serial NOT NULL ,
    feedbacktitletextid integer,
    CONSTRAINT feedback_pkey PRIMARY KEY (feedbackid),
    CONSTRAINT feedback_feedbacktitletextid_fkey FOREIGN KEY (feedbacktitletextid)
        REFERENCES public.texts (textid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)



-- Table: public.feedbackquestions

DROP TABLE IF EXISTS public.feedbackquestions;

CREATE TABLE IF NOT EXISTS public.feedbackquestions
(
    feedbackid integer NOT NULL,
    questionid smallint NOT NULL,
    questiontextid integer NOT NULL,
    answertype smallint NOT NULL,
    CONSTRAINT feedbackquestions_pkey PRIMARY KEY (questionid, feedbackid),
    CONSTRAINT feedbackquestions_feedbackid_fkey FOREIGN KEY (feedbackid)
        REFERENCES public.feedback (feedbackid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)



-- Table: public.lessonstatus

DROP TABLE IF EXISTS public.lessonstatus;

CREATE TABLE IF NOT EXISTS public.lessonstatus
(
    lessonstatusid smallserial NOT NULL ,
    textid integer NOT NULL,
    CONSTRAINT lessonstatus_pkey PRIMARY KEY (lessonstatusid),
    CONSTRAINT lessonstatus_textid_fkey FOREIGN KEY (textid)
        REFERENCES public.texts (textid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)


-- Table: public.lesson

DROP TABLE IF EXISTS public.lesson;

CREATE TABLE IF NOT EXISTS public.lesson
(
    lessonid bigserial NOT NULL ,
    teacherid bigint NOT NULL,
    studentid bigint NOT NULL,
    lessondatetimestart timestamp with time zone NOT NULL,
    meetlink character varying(255) COLLATE pg_catalog."default" NOT NULL,
    lessonstatusid smallint NOT NULL DEFAULT 0,
    "topicId" integer,
    comments text COLLATE pg_catalog."default",
    CONSTRAINT lesson_pkey PRIMARY KEY (lessonid),
    CONSTRAINT lesson_lessonstatusid_fkey FOREIGN KEY (lessonstatusid)
        REFERENCES public.lessonstatus (lessonstatusid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT lesson_studentid_fkey FOREIGN KEY (studentid)
        REFERENCES public.classmate (userid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT lesson_teacherid_fkey FOREIGN KEY (teacherid)
        REFERENCES public.classmateteacher (userid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)




-- Table: public.lessonfeedback

DROP TABLE IF EXISTS public.lessonfeedback;

CREATE TABLE IF NOT EXISTS public.lessonfeedback
(
    lessonfeedbackid bigserial NOT NULL ,
    lessonid bigint NOT NULL,
    feedbackid integer NOT NULL,
    questionid smallint NOT NULL,
    answer smallint NOT NULL,
    resposetime timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT lessonfeedback_pkey PRIMARY KEY (lessonfeedbackid),
    CONSTRAINT lessonfeedback_feedbackid_questionid_fkey FOREIGN KEY (feedbackid, questionid)
        REFERENCES public.feedbackquestions (feedbackid, questionid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)





