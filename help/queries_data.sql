-- DROP FUNCTION getCourseById
	CREATE OR REPLACE FUNCTION getCourseById(
  course_id INT
)
RETURNS TABLE (coursename varchar(100), lang character(2))
AS $$
BEGIN
  RETURN QUERY SELECT textbylang.htmltext  as coursename , textbylang.langcode as lang
   FROM courses JOIN textbylang on courses.textid = textbylang.textid
   WHERE  courseid = course_id;
END;
$$ LANGUAGE plpgsql;

-- SELECT * FROM getCourseById(5);

-- DROP FUNCTION getCourseByIdAndLang
	CREATE OR REPLACE FUNCTION getCourseByIdAndLang(
  course_id INT,
  lang character(2)
)
RETURNS TABLE (coursename varchar(100))
AS $$
BEGIN
  RETURN QUERY SELECT textbylang.htmltext  as coursename 
   FROM courses JOIN textbylang on courses.textid = textbylang.textid
   WHERE  courseid = course_id AND  textbylang.langcode LIKE lang;
END;
$$ LANGUAGE plpgsql;

-- SELECT * FROM getCourseByIdAndLang(1,'he');

CREATE OR REPLACE FUNCTION getCourses()
RETURNS TABLE (courseid INT, coursename varchar(100) , lang character(2))
AS $$
BEGIN
  RETURN QUERY 
	SELECT courses.courseid, textbylang.htmltext  as coursename  , textbylang.langcode as lang
   FROM courses JOIN textbylang on courses.textid = textbylang.textid
   ORDER BY courseid, lang;
END;
$$ LANGUAGE plpgsql;
-- SELECT * FROM getCourses();

-- DROP FUNCTION getCoursesWithTopics;
CREATE OR REPLACE FUNCTION getCoursesWithTopics( 
)
RETURNS TABLE (courseid INT, coursename varchar(100),  lang character(2),  topicid INT, topicname varchar(100))
AS $$
BEGIN
  RETURN QUERY
	SELECT courses.courseid, textbylang.htmltext as courseName, textbylang.langcode as lang,
      coursetopics.topicid, tl.htmltext as topicName
FROM (courses JOIN textbylang on courses.textid = textbylang.textid)
     JOIN coursetopics on coursetopics.courseid = courses.courseid
     join textbylang as tl  on tl.textid = coursetopics.textid
	WHERE textbylang.langcode = tl.langcode
	ORDER BY courses.courseid, coursetopics.topicid;
END;
$$ LANGUAGE plpgsql;


-- SELECT * FROM getCoursesWithTopics();


CREATE OR REPLACE FUNCTION getCourseTopicsByCourseId( 
	 cid INT, lang character(2)
)
RETURNS TABLE (topicid INT, topicname varchar(100))
AS $$
BEGIN
  RETURN QUERY
	SELECT  coursetopics.topicid, tl.htmltext as topicName
	FROM  coursetopics join textbylang as tl on tl.textid = coursetopics.textid  
	WHERE tl.langcode=lang AND  coursetopics.courseid = cid
	ORDER BY  coursetopics.topicid;
END;
$$ LANGUAGE plpgsql;

-- SELECT * FROM getCourseTopicsByCourseId(2,'he');

CREATE OR REPLACE FUNCTION getCourseIdByName(
  course_name varchar(100), lang character(2)
)
RETURNS TABLE (courseid integer, coursename varchar(100))
AS $$
BEGIN
  RETURN QUERY SELECT courses.courseid , textbylang.htmltext as coursename
   FROM courses JOIN textbylang on courses.textid = textbylang.textid
   WHERE textbylang.langcode = lang and textbylang.htmltext like course_name;
END;
$$ LANGUAGE plpgsql;

-- SELECT * FROM getCourseIdByName('כימיה','he');

CREATE OR REPLACE FUNCTION getCourseTopicIdByName( 
	 course_id INT, topic_name varchar(100), lang character(2)
)
RETURNS TABLE (topicid INT, topicname varchar(100))
AS $$
BEGIN
  RETURN QUERY
	SELECT  coursetopics.topicid, tl.htmltext as topicName
	FROM  coursetopics join textbylang as tl on tl.textid = coursetopics.textid  
	WHERE tl.langcode=lang AND  coursetopics.courseid = course_id and tl.htmltext like topic_name
	ORDER BY  coursetopics.topicid;
END;
$$ LANGUAGE plpgsql;



-- SELECT * FROM getCourseTopicIdByName( 3, 'אנרגיה','he'); 



DROP PROCEDURE addcourse;
CREATE OR REPLACE PROCEDURE addCourse(
	IN course_name varchar(100), 
	IN lang char(2),
	OUT course_id BIGINT,  -- Add this OUT parameter for the course_id
    OUT next_text_id BIGINT
)
LANGUAGE plpgsql
AS $$
   DECLARE
    -- Declare a variable to hold the inserted course_id
    inserted_course_id BIGINT;
BEGIN


  next_text_id := nextval('texts_textid_seq'::regclass);

  INSERT INTO textbylang(langcode, htmltext, textid)  
	  VALUES (lang, course_name, next_text_id);

  INSERT INTO courses(textid)
	  VALUES (next_text_id)
 	RETURNING courseid INTO inserted_course_id;  -- Assuming 'courseid' is the primary key of courses

 -- Set the OUT parameter course_id to the inserted value
    course_id := inserted_course_id;
END ;
$$ ;
--------------------------------

-- call addCourse('בדיקות תוכנה','he', next_text_id, null, null);
-- call addCourse($1,'he', null, null);`; 

DO $$
      DECLARE
          next_text_id BIGINT;
          course_id BIGINT;
      BEGIN
          CALL addCourse('איפון מערכות','he', course_id, next_text_id );
          RAISE NOTICE 'Next text ID: %, Course ID: %', next_text_id, course_id;
      END $$;


----------
-- const updateCourseWithId = `CALL updateCourse($1, $2, $3, $4,$5);`; //courseId, courseName, courselang

CREATE OR REPLACE PROCEDURE updateCourse(
  IN course_id BIGINT, 
	IN course_name varchar(100), 
	IN lang char(2),
	OUT text_id BIGINT
)
LANGUAGE plpgsql
AS $$
DECLARE
    -- Declare a variable to hold the found_text_id
    found_text_id BIGINT;
BEGIN

  SELECT textid INTO found_text_id
  FROM courses 
  WHERE courseid = course_id ;

  -- Check if the courseid exists
  IF found_text_id IS NULL THEN
    RAISE EXCEPTION 'Course ID % not found', course_id;
  END IF;

 -- Update the textbylang table
  UPDATE  textbylang 
  SET  htmltext = course_name
  WHERE textid = found_text_id AND langcode = lang;

 -- Set the OUT parameter course_id to the inserted value
    text_id := found_text_id;
END ;
$$ ;


--- DROP PROCEDURE addCourseWithId

CREATE OR REPLACE PROCEDURE addCourseWithId(
  IN course_id BIGINT, 
	IN course_name varchar(100), 
	IN lang char(2),
	OUT text_id BIGINT
)
LANGUAGE plpgsql
AS $$
DECLARE
    -- Declare a variable to hold the found_text_id
    found_text_id BIGINT;
BEGIN

  SELECT textid INTO found_text_id
  FROM courses 
  WHERE courseid = course_id ;

  -- Check if the courseid exists
  IF found_text_id IS NULL THEN
    RAISE EXCEPTION 'Course ID % not found', course_id;
  END IF;

 -- Insert value into textbylang table
  INSERT INTO  textbylang 
  (htmltext, textid, langcode) VALUES 
  (course_name, found_text_id, lang);

 -- Set the OUT parameter course_id to the inserted value
    text_id := found_text_id;
END ;
$$ ;

-- removeCourse($1)

CREATE OR REPLACE PROCEDURE removeCourse(
  IN course_id BIGINT
)
LANGUAGE plpgsql
AS $$
DECLARE
    -- Declare a variable to hold the found_text_id
    found_text_id BIGINT;
BEGIN

  SELECT textid INTO found_text_id
  FROM courses 
  WHERE courseid = course_id ;

 -- Insert value into textbylang table
  DELETE FROM  textbylang 
  WHERE textid = found_text_id;

  DELETE FROM courses 
  WHERE courseid = course_id;
END ;
$$ ;


-------------------------
-- GENDER table and lextByLang

-- `SELECT * FROM getGenders()`;
-- `SELECT * FROM getGendersByLang( $1);`;

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

-- DROP FUNCTION IF EXISTS public.getgenders();

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

ALTER FUNCTION public.getgenders()
    OWNER TO postgres;

SELECT * FROM getGenders();


SELECT gendercode , textbylang.langcode as lang, htmltext as gendername,  textbylang.textid
   FROM classmategendercode JOIN textbylang on classmategendercode.textid = textbylang.textid;



SELECT * FROM getGenders();



SELECT * FROM getGenders();


SELECT gendercode , textbylang.langcode as lang, htmltext as gendername,  classmategendercode.textid
   FROM classmategendercode JOIN textbylang on classmategendercode.textid = textbylang.textid;

DELETE FROM classmategendercode
SELECT * FROM classmategendercode;
CALL addGender('M', 'Male', 'en');
CALL addGender('F', 'Female', 'en'); 
CALL addGender('C', 'Common', 'en');
CALL updateGender('F', 'את/היא', 'he');
CALL updateGender('M', 'אתה/הוא', 'he');
CALL updateGender('C', 'אתם/הם', 'he');

  SELECT classmategendercode.textid
  FROM classmategendercode 
  WHERE classmategendercode.gendercode = 'C' ;

SELECT * FROM classmategendercode;