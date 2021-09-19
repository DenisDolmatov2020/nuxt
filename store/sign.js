export const actions = {
  async update ({ state, dispatch }, user) {
    const formData = new FormData()
    const keys = Object.keys(user)
    keys.forEach(key => {
      if (user[key] && (key !== 'image' || key === 'image' && typeof user[key] === 'object')) {
        formData.append(key, user[key])
      }
    })
    formData.getAll('image')
    try {
      const response = await this.$axios.patch(
        '/api/my-user/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
      if (response.status === 200) {
        this.$root.$emit('snackbar', { color: 'success', text: 'Изменения профиля сохранены' })
        await this.$auth.fetchUser()
      }
    } catch (error) {
      this.$root.$emit('snackbar', { color: 'error', text: 'Ошибка при обновлении профиля' })
    }
  }
}
