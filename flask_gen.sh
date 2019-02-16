# React component scaffold
# can generate
# - a simple componoent
# - a connected component
# - --reducer flag
# - form component with --pages flag (to generate a form)
# -
# Usage
# react-scaffold generate (simple | connected) <name> --reducer
#
#
#

# do a check to make sure we have an application name
function usage() {
echo "######################"
echo "### react scaffold ###"
echo "######################"
echo "welcome to flask scaffold/flask gen"
echo "// :Usage: //"
echo "fg (api| test) <name> --"
}



function api() {
    cat <<- _EOF_
from flask import jsonify, request
from application import application, mongo
from flask_jwt_extended import jwt_required, get_jwt_identity
from helpers import serialize_dictionary_list

data_model = {
        "$name": 1,
    }

@application.route('/$name', methods=['GET'])
@jwt_required
def $name():
    email = get_jwt_identity()
    $collection = mongo.db.$collection.find({}, data_model)
    return jsonify({ 'msg': 'success', 'data': serialize_dictionary_list($collection) }), 200
_EOF_
}


function api_test() {
  cat <<- _EOF_
import unittest
import app
from application import mongo
from test.helpers import clean_mongo, post

class Test_$name(unittest.TestCase):
    def setUp(self):
        app.application.testing = True
        self.app = app.application.test_client()

    def tearDown(self):
        clean_mongo()

    def test_$name(self):
        data = {}
        post(tester=self, route='/$name', data=data)
_EOF_
}

function generate() {
    if [[ ! -d "test/api" ]]; then
      echo "can't find test directory. Try from your project root."
      exit 1;
    fi

    if [[ ! -d "api" ]]; then
      echo "can't find api directory. Try from your project root."
      exit 1;
    fi

    # echo "creating directory" $name
    # mkdir -p src/$name
    # cd src/$name

    if [ "$type" = "test" ]; then
        echo "adding test to ./test/api/$name.py"
        api_test > test/api/$name.py
    fi

    if [ "$type" = "api" ]; then
        echo "boilerplate api method in ./api/$name.py"
        api > api/$name.py
        echo "adding test to ./test/api/$name.py"
        api_test > test/api/$name.py
    fi


    echo "Done!"
}


# to create an domain object "character", with fields, "cartoon, createad at, updated_at, color, friends", which you can create get, update and delete:
# fg api character -crud
# this puts

name=$2
type=$1

if [ "$name" == "" ]; then
    echo "you need a file name"
    usage
    exit 1;
fi

if [ "$1" == "--help" -o "$1" == "-h" ]; then
    usage
    exit 1;
fi

if [ "$1" != "api" -a "$1" != "test" ]; then
    echo "available commands [api]"
    usage
    exit 1;
fi

collection='DEFAULT_COLLECTION'

while [ "$3" != "" ]; do
    case "$3" in
        "--collection") shift
                        collection=$3
                        ;;
        "-c") create='true';;
        "-r") get='true';;
        "-u") update='true';;
        "-d") delete='true';;
        "-auth") authenticate='true';;
    esac
    shift
done


generate
