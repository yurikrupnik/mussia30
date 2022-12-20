package main

import (
	"fmt"
	//"github.com/amalshaji/fiber-grpc/proto"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/monitor"
	"github.com/gofiber/fiber/v2/middleware/recover"
	go_fiber_helpers "mussia30/libs/go/fiber-helpers"
	go_models_user "mussia30/libs/go/models/user"
	go_mongodb "mussia30/libs/go/mongodb"
	go_shared "mussia30/libs/go/shared"

	//"github.com/yurikrupnik/nx-go-playground/my-lib"
	"log"
	// "go.mongodb.org/mongo-driver/bson/primitive"
)

// type Project struct {
// 	ID   primitive.ObjectID `json:"id" bson:"_id,omitempty"`
// 	Name string             `json:"name" bson:"name,omitempty" validate:"required,min=3,max=36"`
// }

var userCollection = "user"

// var notificationCollection = "notifications"

func main() {
	// Connect to the database
	//conn, err := grpc.Dial("localhost:4040", grpc.WithInsecure())
	//if err != nil {
	//	panic(err)
	//}
	//
	//client := proto.NewAddServiceClient(conn)
	if err := go_mongodb.Connect(); err != nil {
		log.Println("failed to connect")
		log.Fatal(err)
	}

	app := fiber.New(fiber.Config{
		ErrorHandler: go_fiber_helpers.DefaultErrorHandler,
	})

	app.Use(recover.New())
	// Default middleware config
	app.Use(logger.New())
	//app.Use(csrf.New()) // todo check it - forbidden post events
	app.Use(cors.New())
	apiGroup := app.Group("api")
	apiGroup1 := app.Group("v1")
	apiGroup1.Get("/aris", func(ctx *fiber.Ctx) error {
		return ctx.SendString("no51111")
	})
	apiGroup1.Get("/friends", func(ctx *fiber.Ctx) error {
		return ctx.SendString("friends")
	})
	apiGroup1.Get("/sap", func(ctx *fiber.Ctx) error {
		return ctx.SendString("bir!!")
	})
	//go_models_user.CreateFakeGroup[users.User](apiGroup, "users")
	// go_fiber_helpers.CreateFakeGroup[Project](apiGroup, "projects", "projects")
	go_fiber_helpers.CreateFakeGroup[go_models_user.User](apiGroup, "users", userCollection)

	app.Get("/dashboard", monitor.New())
	port := go_shared.Getenv("PORT", "8080")
	log.Println("port", port)
	host := go_shared.Getenv("HOST", "0.0.0.0")
	result := fmt.Sprintf("%s:%s", host, port)
	log.Panic(app.Listen(result))
}
