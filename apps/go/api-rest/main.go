package main

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/monitor"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"go.mongodb.org/mongo-driver/bson/primitive"
	go_fiber_helpers "mussia30/libs/go/fiber-helpers"
	"mussia30/libs/go/generic-api"
	"mussia30/libs/go/models/user"
	go_shared "mussia30/libs/go/shared"
	//"github.com/yurikrupnik/nx-go-playground/my-lib"
	"log"
	// "go.mongodb.org/mongo-driver/bson/primitive"
)

type Project struct {
	ID   primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	Name string             `json:"name" bson:"name,omitempty" validate:"required,min=3,max=36"`
}

var db = "goApp"
var userCollection = "users"
var projectsCollection = "projects"

func main() {
	app := fiber.New(fiber.Config{
		ErrorHandler: go_fiber_helpers.DefaultErrorHandler,
	})

	app.Use(recover.New())
	app.Use(logger.New())
	//app.Use(csrf.New()) // todo check it - forbidden post events
	// todo cors in prod!
	app.Use(cors.New())
	apiGroup := app.Group("api")
	//	users.New[users.User](apiGroup, db, userCollection)
	go_generic_api.New[go_models_user.User](apiGroup, db, userCollection)
	go_generic_api.New[Project](apiGroup, db, projectsCollection)

	//go_models_user.CreateFakeGroup[users.User](apiGroup, "users")
	// go_fiber_helpers.CreateFakeGroup[Project](apiGroup, "projects", "projects")
	//go_fiber_helpers.CreateFakeGroup[go_models_user.User](apiGroup, "users", userCollection)

	app.Get("/dashboard", monitor.New())
	port := go_shared.Getenv("PORT", "8080")
	log.Println("port", port)
	host := go_shared.Getenv("HOST", "0.0.0.0")
	result := fmt.Sprintf("%s:%s", host, port)
	log.Panic(app.Listen(result))
}
