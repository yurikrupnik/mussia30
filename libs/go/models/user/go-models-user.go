package go_models_user

// User omitempty does not save in db if does not exists!
type User struct {
	ID        string `json:"id,omitempty" bson:"_id,omitempty"`
	Email     string `validate:"required,email,min=6,max=32" json:"email,omitempty" bson:"email,omitempty"`
	Username  string `validate:"required" json:"username" bson:"username"`
	FirstName string `validate:"required" json:"first_name" bson:"first_name,omitempty"`
	LastName  string `validate:"required" json:"last_name" bson:"last_name,omitempty"`
	//Role  string `json:"role"`
	//Role float64 `json:"salary"`
	//Age    float64 `json:"age"`
}
