CREATE OR REPLACE PROCEDURE addOrUpdateTeacher(
  IN user_id BIGINT, 
	IN hours int
)
LANGUAGE plpgsql
AS $$
DECLARE
    -- Declare a variable to hold the found_user_id
    found_user_id BIGINT;
BEGIN
-- Check if the user_id exists in the classmateteacher table
  SELECT userid INTO found_user_id
  FROM classmateteacher 
  WHERE userid = user_id ;

   -- If the user_id does not exist, insert a new record
  IF found_user_id IS NULL THEN
    RAISE NOTICE 'Adding new teacher with user_id: %', user_id;
    INSERT INTO classmateteacher (userid, hourstovolunteer) 
    VALUES (user_id, hours);
  ELSE
    -- If the user_id exists, update the hours
    RAISE NOTICE 'Updating hours for existing teacher with user_id: %', user_id;
    UPDATE classmateteacher
    SET hourstovolunteer = hours
    WHERE userid = user_id;
  END IF;
  
END ;
$$ ;

CREATE OR REPLACE FUNCTION getUsers()
RETURNS TABLE (
    userid bigint ,
    email character varying(255) ,
    languicode character(2),
    firstname character varying(20) ,
    lastname character varying(20),
    classmategendercode character(1) ,
    firebase_uid character varying(16)
)
AS $$
BEGIN
  RETURN QUERY 
	SELECT  
      classmate.userid, 
	  classmate.email, 
	  classmate.languicode,  
	  classmate.firstname,  
	  classmate.lastname,
      classmate.classmategendercode,  
	  classmate.firebase_uid  
  FROM classmate;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION getUserById(
   IN user_id bigint 
)
RETURNS TABLE (
    userid bigint ,
    email character varying(255) ,
    languicode character(2),
    firstname character varying(20) ,
    lastname character varying(20),
    classmategendercode character(1) ,
    firebase_uid character varying(16)
)
AS $$
BEGIN
  RETURN QUERY 
	SELECT  
    t.userid, 
	  t.email, 
	  t.languicode,  
	  t.firstname,  
	  t.lastname,
    t.classmategendercode,  
	  t.firebase_uid  
  FROM getUsers() as t WHERE t.userid = user_id;
END;
$$ LANGUAGE plpgsql;

SELECT * FROM classmate

DROP TABLE IF EXISTS public.classmate CASCADE;

CREATE TABLE IF NOT EXISTS public.classmate
(
    userid bigserial NOT NULL ,
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    languicode character(2) COLLATE pg_catalog."default" NOT NULL,
    firstname character varying(20) COLLATE pg_catalog."default" NOT NULL,
    lastname character varying(20) COLLATE pg_catalog."default" NOT NULL,
    classmategendercode character(1) COLLATE pg_catalog."default",
    firebase_uid character varying(16) COLLATE pg_catalog."default",
    CONSTRAINT classmate_pkey PRIMARY KEY (userid),
    CONSTRAINT classmate_gendercode_fkey FOREIGN KEY (classmategendercode)
        REFERENCES classmategendercode (gendercode) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT classmateuser_languicode_fkey FOREIGN KEY (languicode)
        REFERENCES public.lang (langcode) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)


CREATE OR REPLACE FUNCTION getGendersByLang(
	IN lang_code character(2)
)
RETURNS TABLE (gendercode character(1), lang character(2), gendername varchar(100))
AS $$
BEGIN
  RETURN QUERY SELECT classmategendercode.gendercode , textbylang.langcode as lang, htmltext as gendername
   FROM classmategendercode JOIN textbylang on classmategendercode.textid = textbylang.textid
	WHERE textbylang.langcode = lang_code;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.getgenders(
	)
    RETURNS TABLE(gendercode character, lang character, gendername character varying) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN
  RETURN QUERY SELECT classmategendercode.gendercode , textbylang.langcode as lang, htmltext as gendername
   FROM classmategendercode JOIN textbylang on classmategendercode.textid = textbylang.textid;
END;
$BODY$;

CREATE OR REPLACE PROCEDURE updateGender(
  IN gender_code character(1),
	IN gender_name varchar(100), 
	IN lang character(2)
)
LANGUAGE plpgsql
AS $$
DECLARE
    -- Declare a variable to hold the found_text_id
    found_text_id BIGINT;
    
BEGIN

  SELECT textid INTO found_text_id
  FROM classmategendercode 
  WHERE gendercode = gender_code ;

-- If gender code not found, raise an exception
IF found_text_id IS NULL THEN
  RAISE EXCEPTION 'Gender % not found', gender_code;
END IF;

    -- Check if the gender name already exists for the given language
  IF NOT EXISTS (
      SELECT 1
      FROM textbylang
      WHERE textid = found_text_id AND langcode = lang
  ) THEN
      -- If not exists, insert a new record
      RAISE NOTICE 'Gender % with lang % is new', gender_code, lang;
      INSERT INTO textbylang(langcode, htmltext, textid)
      VALUES (lang, gender_name, found_text_id);
  ELSE
      -- If exists, update the existing record
      UPDATE textbylang
      SET htmltext = gender_name
      WHERE textid = found_text_id AND langcode = lang;
      RAISE NOTICE 'Gender % with lang % updated', gender_code, lang;
  END IF;

END ;
$$ ;


DROP PROCEDURE addgender;
CREATE OR REPLACE PROCEDURE addGender(
  IN gender_code character(1),
	IN gender_name varchar(100), 
	IN lang character(2)
)
LANGUAGE plpgsql
AS $$
DECLARE
    -- Declare a variable to hold the found_text_id
    text_id BIGINT;
BEGIN

  IF NOT EXISTS (
      SELECT 1
      FROM classmategendercode
      WHERE gendercode = gender_code
  ) THEN
	
  text_id := nextval('texts_textid_seq'::regclass);

  INSERT INTO textbylang(langcode, htmltext, textid)  
	  VALUES (lang, gender_name, text_id);

  INSERT INTO classmategendercode(gendercode, textid)
	  VALUES (gender_code, text_id);

  ELSE
	CALL updateGender(gender_code, gender_name, lang);
 END IF;

END ;
$$ ;
