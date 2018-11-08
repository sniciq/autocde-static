#!/bin/bash
mysqldump -h 127.0.0.1 -uroot -p"123456" code_gen > code_gen.sql
mysqldump -h 127.0.0.1 -uroot -p"123456" code_gen  --skip-add-locks --no-data > code_gen_nodata.sql

