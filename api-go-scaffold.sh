if [ "$#" -ne 1 ]; then
  echo "usage: $0 <app_name>";
  exit 1;
fi

function scaffold() {
    local name=$1

    echo "creating directory $name"

    mkdir $name
    cd $name

    mkdir handlers structs

    touch README.md
    touch $name"_test.go"

    # main
    echo "package main

import (
    \"fmt\"
    \"github.com/simonstead/$name/handlers\"
    \"net/http\"
    \"os\"
)

func determineListenAddress() (string, error) {
    port := os.Getenv(\"PORT\")
    if port == \"\" {
        return \"\", fmt.Errorf(\"$PORT not set\")
    }
    return \":\" + port, nil
}

func main() {
    PORT, err := determineListenAddress()
    if err != nil {
        PORT = \":4000\"
    }

    http.HandleFunc(\"/\", handlers.RootHandler)

    // server
    fmt.Printf(\"-\n- Listening on port %v\n-\n\", PORT)
    if err := http.ListenAndServe(PORT, nil); err != nil {
        panic(err)
    }
}" > $name.go



    echo "package main

import (
    \"encoding/json\"
    \"github.com/simonstead/$name/handlers\"
    \"github.com/simonstead/$name/structs\"
    \"net/http\"
    \"net/http/httptest\"
    \"testing\"
)

func TestIndexRoute(t *testing.T) {
    req, err := http.NewRequest(\"GET\", \"/\", nil)
    if err != nil {
        t.Fatal(err)
    }
    rr := httptest.NewRecorder()

    handler := http.HandlerFunc(handlers.RootHandler)

    handler.ServeHTTP(rr, req)

    if status := rr.Code; status != http.StatusOK {
        t.Errorf(\"Handler returned wrong status code, got %v but wanted %v\", status, http.StatusOK)
    }

    result := structs.JsonRepsonse{}
    if err := json.NewDecoder(rr.Body).Decode(&result); err != nil {
        t.Errorf(\"body did not return correct json response: %v\", err)
    }

    if result.Msg != \"success\" {
        t.Errorf(\"json response returned but it errored:\n %v\", result.Error)
    }
}" > $name"_test.go"




    # git
    git init
    echo ".env" > .gitignore







    # handlers
    echo "package handlers

import (
    \"encoding/json\"
    \"github.com/simonstead/$name/structs\"
    \"net/http\"
)

func RootHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set(\"Content-Type\", \"application/json\")

    response := &structs.JsonRepsonse{Msg: \"success\", Data: \"this is some data for you\"}

    if err := json.NewEncoder(w).Encode(response); err != nil {
        panic(err)
    }
}" > handlers/handlers.go




    # structs
    echo "package structs

type JsonRepsonse struct {
    Msg   string \`json:\"msg\"\`
    Data  string \`json:\"data\"\`
    Error string \`json:\"error\"\`
}" > structs/structs.go




    go fmt
    go build
    dep init
    dep ensure



    # heroku stuff
    echo "[metadata.heroku]
  root-package = \"github.com/simonstead/$name\"

[prune]
  go-tests = true
  unused-packages = true
" > Gopkg.toml

    echo "web: $name" > Procfile


    git add .
    git commit -m "first commit of a simple api for $name"

}

scaffold $1
