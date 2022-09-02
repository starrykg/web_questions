package main

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func main() {
	router := SetupRouter()
	_ = router.Run("127.0.0.1:9999")
}

type As struct {
	Title   string   `json:"title"`
	Answer  []string `json:"answer"`
	Explain string   `json:"explain"`
	Link    string   `json:"link"`
	Correct string   `json:"correct"`
}

func SetupRouter() *gin.Engine {
	router := gin.Default()
	// 添加 Get 请求路由

	router.Use(Cors())

	router.GET("/quests", func(context *gin.Context) {
		das := []As{{
			Title:   "question 1",
			Answer:  []string{"1", "2", "c"},
			Explain: "大部队",
			Correct: "1",
		}, {
			Title:   "question 2",
			Answer:  []string{"1", "2", "c"},
			Explain: "2部队",
			Correct: "1",
		}}
		context.JSON(http.StatusOK, das)
	})

	return router
}

// 处理跨域请求,支持options访问
func Cors() gin.HandlerFunc {
	return func(c *gin.Context) {
		method := c.Request.Method

		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, UPDATE")
		c.Header("Access-Control-Allow-Headers", "*")
		c.Header("Access-Control-Expose-Headers", "Content-Length, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Cache-Control, Content-Language, Content-Type")
		c.Header("Access-Control-Allow-Credentials", "true")

		//放行所有OPTIONS方法
		if method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
		}
		// 处理请求
		c.Next()
	}
}
