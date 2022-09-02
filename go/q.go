package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"strconv"
)

func main() {
	Loadfile()
}

type Que struct {
	Question []As `json:"question"`
}

type As struct {
	QuestId  int      `json:"questId"`
	Type     int      `json:"type"`
	Question string   `json:"question"`
	Answer   string   `json:"answer"`
	Analysis string   `json:"analysis"`
	Correct  int      `json:"correct"`
	An       []string `json:"an"`
}

type Ab struct {
	Index  int    `json:"index"`
	Answer string `json:"answer"`
	Score  int    `json:"score"`
}

type Resp struct {
	QuestId int      `json:"questId"`
	Type    int      `json:"type"`
	Title   string   `json:"title"`
	Answer  []string `json:"answer"`
	Explain string   `json:"explain"`
	Link    string   `json:"link"`
	Correct string   `json:"correct"`
}

func Loadfile() {
	jsonFile, err := os.Open("q.txt")
	if err != nil {
		fmt.Println("error opening json file")
		return
	}
	defer jsonFile.Close()

	jsonData, err := ioutil.ReadAll(jsonFile)
	if err != nil {
		fmt.Println("error reading json file")
		return
	}

	var post Que
	json.Unmarshal(jsonData, &post)
	fmt.Println(post)
	for k, v := range post.Question { //选择题
		if v.Type == 0 {
			data := make([]Ab, 0)
			an := make([]string, 0)
			json.Unmarshal([]byte(v.Answer), &data)
			fmt.Println("================================", data)
			for i, j := range data {
				an = append(an, j.Answer)
				if j.Score == 1 {
					post.Question[k].Correct = i
				}
			}
			post.Question[k].An = an
		} else if v.Type == 2 { //判断题 0对 1错
			an := make([]string, 0)
			an = append(an, "正确")
			an = append(an, "错误")
			post.Question[k].An = an
			post.Question[k].Correct = String2Int(v.Answer, 0)
		} else {
			panic("not support")
		}
	}
	fmt.Println("post:", post)
}

func String2Int(s string, defaultval int) int {
	a, err := strconv.Atoi(s)
	if err != nil {
		return defaultval
	}

	return a
}
