package main

import (
	"fmt"
	go_shared "mussia30/libs/go/shared"
	"net/http"
	//"github.com/amalshaji/fiber-grpc/proto"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/monitor"
	"github.com/gofiber/fiber/v2/middleware/recover"
	go_fiber_helpers "mussia30/libs/go/fiber-helpers"
	go_models_user "mussia30/libs/go/models/user"
	go_mongodb "mussia30/libs/go/mongodb"
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
type IError struct {
	Field string `json:"field"`
	Tag   string `json:"tag"`
	Value string `json:"value"`
}

var validate = validator.New()

func ValidateStruct(user go_models_user.User) []*IError {
	var errors []*IError
	err := validate.Struct(user)
	if err != nil {
		for _, err := range err.(validator.ValidationErrors) {
			var element IError
			element.Field = err.StructNamespace()
			element.Tag = err.Tag()
			element.Value = err.Param()
			errors = append(errors, &element)
		}
	}
	return errors
}

// create validation example
func create(c *fiber.Ctx) error {
	var payload go_models_user.User
	if err := c.BodyParser(&payload); err != nil {
		return c.Status(http.StatusBadRequest).JSON(err.Error())
	}
	errors := ValidateStruct(payload)
	if errors != nil {
		return c.Status(fiber.StatusBadRequest).JSON(errors)
	}
	return c.JSON(fiber.Map{
		"message": "Hello World",
	})
}

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
	apiGroup1.Post("/friends", create)
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
